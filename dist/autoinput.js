/* Create By Pioupia https://github.com/pioupia/auto-input-a2f/ | MIT License */
let allBoxes = [];
let option = {autoend: true, selectAuto: true, canPast: true, createAuto: false, parent: document.querySelector("[data-parent-a2f]") || document.getElementById('a2fParent')};
function initAutoInput(options={}, callback){
   (option = {...option,...options});
    if(option.createAuto){
        if(!option.parent) return console.error("Parent does not exist.");
        for(let i = 0; i < 6; i++){
            const e = document.createElement("input");
            e.setAttribute("data-a2f",'');
            e.setAttribute("type",'text');
            e.setAttribute("placeholder",'0');
            e.setAttribute('required','');
            if(i == 3){
                const a = document.createElement("span");
                a.innerHTML = "-";
                option.parent.appendChild(a);
            }
            option.parent.appendChild(e)
        }
    }
    allBoxes = document.querySelectorAll("[data-a2f]");
    let array = [];
    allBoxes.forEach(e => array.push(e));
    if((allBoxes?.length||0)<2) return;
    if(option.selectAuto) allBoxes[0].focus();
    for(let i = 0; i < allBoxes.length; i++){
        const e = allBoxes[i];
        e.onpaste = t => handlePaste(t,callback);
        e.onkeypress = t => t.preventDefault();
        e.onkeyup = (t) => {
            if(t.keyCode == 16 || t.keyCode == 20)return;
            if([46,8].includes(t.keyCode)) e.value = '';
            if([46,37,8].includes(t.keyCode)) return allBoxes[i-1]?.focus();
            if([40,39,38].includes(t.keyCode))return t.keyCode == 39 ? allBoxes[i+1]?.focus() : t.keyCode == 38 ? allBoxes[allBoxes.length-1].focus() : allBoxes[0].focus();
            if(isNaN(t.key)) return;
            e.value = t.key;
            if(array.filter(r => r.value).length === allBoxes.length && option.autoend){
                if(callback) return callback(getNumbersCode());
                return document.querySelector('[data-button-validate]')?.click();
            }
            allBoxes[i+1]?.focus();
        }
    };
}

function handlePaste(e,callback) {
    e.stopPropagation();
    e.preventDefault();
    if(!option.canPast) return;
    const clipboardData = e.clipboardData || window.clipboardData;
    if(clipboardData){
        const d = clipboardData.getData("Text").split('');
        for(let i = 0; i < d.length; i++){
            if(!d[i].match(/[0-9]/)) continue;
            if(allBoxes[i]) allBoxes[i].value = d[i].toString();
        }
        if(!option.autoend) return;
        return callback ? callback(getNumbersCode()) : document.querySelector('[data-button-validate]')?.click();
    }
}
function deleteNumbersCode(){
    allBoxes.forEach(e =>  e.value = '');
    if(option?.selectAuto) allBoxes[0]?.focus();
}
function getNumbersCode(){
    if((allBoxes?.length||0)<2) return "Too little input reported";
    let code = '';
    allBoxes.forEach(e => {
        code += e.value;
    });
    return code;
}