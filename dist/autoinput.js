/* Create By Pioupia https://github.com/pioupia/auto-input-a2f/ | MIT License */
let allBoxes = [];
function initAutoInput(options={}, callback){
    typeof options?.autoend != 'boolean' ? options.autoend = true : '';
    typeof options?.selectAuto != 'boolean' ? options.selectAuto = true : '';
    typeof options?.canPast != 'boolean' ? options.canPast = true : '';
    typeof options?.createAuto != 'boolean' ? options.createAuto = false : '';
    options.parent ||= document.querySelector("[data-parent-a2f]") || 'a2fParent';

    if(options.createAuto){
        const parent = document.getElementById(options.parent);
        if(!parent) return console.error("Parent does not exist.");
        for(let i = 0; i < 6; i++){
            const e = document.createElement("input");
            e.setAttribute("data-a2f",'');
            e.setAttribute("type",'text');
            e.setAttribute("placeholder",'0');
            e.setAttribute('required','');
            if(i == 3){
                const a = document.createElement("span");
                a.innerHTML = "-";
                parent.appendChild(a);
            }
            parent.appendChild(e)
        }
    }
    allBoxes = document.querySelectorAll("[data-a2f]");
    let array = [];
    allBoxes.forEach(e => array.push(e));
    if((allBoxes?.length||0)<2) return;
    if(options.selectAuto) allBoxes[0].focus();
    for(let i = 0; i < allBoxes.length; i++){
        const e = allBoxes[i];
        if(options.canPast) e.onpaste = t => handlePaste(t);
        e.onkeyup = (t) => {
            if(t.keyCode == 16)return;
            if(t.keyCode == 8) return e.value = '';
            if(t.keyCode == 46) e.value = '';
            if(t.keyCode == 46 || t.keyCode == 37) return allBoxes[i-1]?.focus();
            if(isNaN(t.key)) return e.value = '';
            e.value = t.key;
            if(array.filter(r => r.value).length === allBoxes.length && options.autoend){
                if(callback) return callback(getNumbersCode());
                return document.querySelector('[data-button-validate]')?.click();
            }
            allBoxes[i+1]?.focus();
        }
    };
}

function handlePaste(e) {
    e.stopPropagation();
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    if(clipboardData){
        const d = clipboardData.getData("Text").split('');
        for(let i = 0; i < d.length; i++){
            if(allBoxes[i]) allBoxes[i].value = d[i];
        }
    }
}
function deleteNumbersCode(){
    allBoxes.forEach(e =>  e.value = '0');
}
function getNumbersCode(){
    if((allBoxes?.length||0)<2) return "Too little input reported";
    let code = '';
    allBoxes.forEach(e => {
        code += e.value;
    });
    return parseInt(code);
}
