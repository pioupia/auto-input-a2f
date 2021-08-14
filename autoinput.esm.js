/* Create By Pioupia https://github.com/pioupia/auto-input-a2f/ | MIT License */
let a=[];let o={autoend:!0,selectAuto:!0,canPast:!0,createAuto:!1,parent:document.querySelector("[data-parent-a2f]")||document.getElementById('a2fParent')};function initAutoInput(os={},k){(o={...o,...os});if(o.createAuto){if(!o.parent)return console.error("Parent does not exist.");for(let i=0;i<6;i++){const e=document.createElement("input");e.setAttribute("data-a2f",'');e.setAttribute("type",'text');e.setAttribute("placeholder",'0');e.setAttribute('required','');if(i==3){const a=document.createElement("span");a.innerHTML="-";o.parent.appendChild(a)}o.parent.appendChild(e)}}a=document.querySelectorAll("[data-a2f]");let m=[];a.forEach(e=>m.push(e));if((a?.length||0)<2)return;if(o.selectAuto)a[0].focus();for(let i=0;i<a.length;i++){const e=a[i];e.onpaste=t=>handlePaste(t,k);e.onkeypress=t=>t.preventDefault();e.onkeyup=(t)=>{if(t.keyCode==16||t.keyCode==20)return;if([46,8].includes(t.keyCode))e.value='';if([46,37,8].includes(t.keyCode))return a[i-1]?.focus();if([40,39,38].includes(t.keyCode))return t.keyCode==39?a[i+1]?.focus():t.keyCode==38?a[a.length-1].focus():a[0].focus();if(isNaN(t.key))return;e.value=t.key;if(m.filter(r=>r.value).length===a.length&&o.autoend){if(k)return k(getNumbersCode());return document.querySelector('[data-button-validate]')?.click()}a[i+1]?.focus()}}}function handlePaste(e,k){e.stopPropagation();e.preventDefault();if(!o.canPast)return;const clipboardData=e.clipboardData||window.clipboardData;if(clipboardData){const d=clipboardData.getData("Text").split('');for(let i=0;i<d.length;i++){if(!d[i].match(/[0-9]/))continue;if(a[i])a[i].value=d[i].toString()}if(!o.autoend)return;return k?k(getNumbersCode()):document.querySelector('[data-button-validate]')?.click()}}function deleteNumbersCode(){a.forEach(e=>e.value='');if(o?.selectAuto)a[0]?.focus()}function getNumbersCode(){if((a?.length||0)<2)return"Too little input reported";let code='';a.forEach(e=>{code+=e.value});return code};export { getNumbersCode, initAutoInput, deleteNumbersCode };