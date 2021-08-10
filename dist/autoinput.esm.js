/* Create By Pioupia https://github.com/pioupia/auto-input-a2f/ | MIT License */
var allBoxes=[];function initAutoInput(a={},c){"boolean"!=typeof a?.autoend?a.autoend=!0:"";"boolean"!=typeof a?.selectAuto?a.selectAuto=!0:"";"boolean"!=typeof a?.canPast?a.canPast=!0:"";"boolean"!=typeof a?.createAuto?a.createAuto=false:"";a?.parent||=document.querySelector("[data-parent-a2f]")||"a2fParent";if(a.createAuto){var b=document.getElementById(a.parent);if(!b)return console.error("Parent does not exist.");for(var g=0;6>g;g++){var f=document.createElement("input");f.setAttribute("data-a2f","");f.setAttribute("type","text");f.setAttribute("placeholder","0");f.setAttribute("required","");if(3==g){var h=document.createElement("span");h.innerHTML="-";b.appendChild(h)}b.appendChild(f)}}allBoxes=document.querySelectorAll("[data-a2f]");var k=[];allBoxes.forEach(function(d){return k.push(d)});var l;if(!(2>((null==(l=allBoxes)?void 0:l.length)||0)))for(a.selectAuto&&allBoxes[0].focus(),b={$jscomp$loop$prop$i$0$4:0};b.$jscomp$loop$prop$i$0$4<allBoxes.length;b={$jscomp$loop$prop$e$1$3:b.$jscomp$loop$prop$e$1$3,$jscomp$loop$prop$i$0$4:b.$jscomp$loop$prop$i$0$4},b.$jscomp$loop$prop$i$0$4++)b.$jscomp$loop$prop$e$1$3=allBoxes[b.$jscomp$loop$prop$i$0$4],a.canPast&&(b.$jscomp$loop$prop$e$1$3.onpaste=function(d){return handlePaste(d)}),b.$jscomp$loop$prop$e$1$3.onkeyup=function(d){return function(e){if(16!=e.keyCode){if(8==e.keyCode)return d.$jscomp$loop$prop$e$1$3.value="";46==e.keyCode&&(d.$jscomp$loop$prop$e$1$3.value="");if(46==e.keyCode||37==e.keyCode){var m;return null==(m=allBoxes[d.$jscomp$loop$prop$i$0$4-1])?void 0:m.focus()}if(isNaN(e.key))return d.$jscomp$loop$prop$e$1$3.value="";d.$jscomp$loop$prop$e$1$3.value=e.key;if(k.filter(function(q){return q.value}).length===allBoxes.length&&a.autoend){if(c)return c(getNumbersCode());var n;return null==(n=document.querySelector("[data-button-validate]"))?void 0:n.click()}var p;null==(p=allBoxes[d.$jscomp$loop$prop$i$0$4+1])||p.focus()}}}(b)}function handlePaste(a){a.stopPropagation();a.preventDefault();if(a=a.clipboardData||window.clipboardData){a=a.getData("Text").split("");for(var c=0;c<a.length;c++)allBoxes[c]&&(allBoxes[c].value=a[c])}}function deleteNumbersCode(){allBoxes.forEach(function(a){return a.value="0"})}function getNumbersCode(){var a;if(2>((null==(a=allBoxes)?void 0:a.length)||0))return"Too little input reported";var c="";allBoxes.forEach(function(b){c+=b.value});return parseInt(c)};export default getNumbersCode;export { getNumbersCode };
