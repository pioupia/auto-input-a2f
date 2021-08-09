(() => {
    const allBoxes = document.querySelectorAll("[data-a2f]");
    if((allBoxes?.length||0)<2) return;
    let i = 0;
    allBoxes.forEach(e => {
        e.oninput = () => {
            if(isNaN(e.value)) e.value = 0;
            if(e.value < 0) e.value = 0;
            if(e.value > 9) e.value = 9;
            if(i+1 > allBoxes.length){
                let canValidate = true;
                for(let o = 0; o < allBoxes.length; o++){
                    if(!allBoxes[o].value){
                        canValidate = allBoxes[o];
                        break;
                    }
                }
                if(canValidate === true){
                    document.querySelector('[data-button-validate]')?.click();
                }else{
                    canValidate.focus();
                }
            }
        }
        i++;
    })
})()

function getNumbersCode(){
    const allBoxes = document.querySelectorAll("[data-a2f]");
    if((allBoxes?.length||0)<2) return "Too little input reported";
    let code = '';
    allBoxes.forEach(e => {
        code += e.value;
    });
    return code;
}
