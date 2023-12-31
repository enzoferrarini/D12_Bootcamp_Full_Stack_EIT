//DESAFÍO N° 12 - FERRARINI ENZO
// TEMATICA Y LINKS SE ENCUNETRAN EN EL FOOTER
let gameEnable=true;
let btnReset;
let colores=["#008000", "#FF00FF","#FF0000","#dca900"];
let cicurlos=document.getElementsByClassName("circle");
let chkSuperpuesto=document.getElementById("idChkSuperpuesto");
let selectorColor=document.getElementById("idSelectorColor");
let footer=document.getElementsByClassName("footer")[0];
footer.innerHTML="<span>Temática elegida: <strong>Venta de Entradas</strong></span>" +footer.innerHTML;

const construirSelector=()=>{
    let contador=1;
    let htmlSelect='<select name="colores" id="idSelectorColores">';
    htmlSelect= htmlSelect.concat('<option value="">Seleccione un color</option>');
    for (let index = 0; index < colores.length; index++) {
        htmlSelect= htmlSelect.concat('<option style="color:'+colores[index]+'" value="'+colores[index]+'"> Color N° '+contador+' </option>');
        contador++;
    }
    htmlSelect= htmlSelect.concat('</select>');
    return htmlSelect;
}

const limpiarCirculos = () => {
    for (let index = 0; index < cicurlos.length; index++) 
        cicurlos[index].style.backgroundColor="white";   
}

const resetear_juego = () => {    
    limpiarCirculos();
    htmlSelect.selectedIndex=0;  
    chkSuperpuesto.checked=false; 
}

const addEventListenerCirculos=() => {
    for (let index = 0; index < cicurlos.length; index++) {
        cicurlos[index].addEventListener('click', llamar_func);
    }
}

const llamar_func=(e) => {
    if(gameEnable)
    {
        limpiarCirculos();
        let idSelected=e.target.getAttribute("id");
        if(!chkSuperpuesto.checked)
        {
            let circuloSelected= document.getElementById(idSelected);
            circuloSelected.style.backgroundColor=htmlSelect[htmlSelect.selectedIndex].value;
        }
        else{
            for (let index = 0; index < cicurlos.length; index++) {
                if(cicurlos[index].getAttribute("id") ==idSelected)
                {
                    cicurlos[index].style.backgroundColor=htmlSelect[htmlSelect.selectedIndex].value;
                    break;
                }
                else
                {
                    cicurlos[index].style.backgroundColor=htmlSelect[htmlSelect.selectedIndex].value;            
                }           
            }
        }
    }
    e.stopPropagation();   
}

selectorColor.innerHTML=construirSelector();
htmlSelect=document.getElementById("idSelectorColores");
addEventListenerCirculos();

let buttonsCollection= document.getElementsByTagName("button");
for (let index = 0; index < buttonsCollection.length; index++) {
    if(buttonsCollection[index].innerText=="Resetear juego")
    {
        buttonsCollection[index].addEventListener('click', resetear_juego);
        btnReset=buttonsCollection[index];
        break;
    }
    
}

//CONTROL DE SIZE_W <500
const deshabilitarJuego=() => {
    chkSuperpuesto.setAttribute('disabled', '');
    htmlSelect.setAttribute('disabled', '');
    btnReset.setAttribute('disabled', '');
    gameEnable=false;
    for (let index = 0; index < cicurlos.length; index++) 
        cicurlos[index].style.backgroundColor="lightgray";   
   
}
const habilitarJuego=() => {
    chkSuperpuesto.removeAttribute('disabled');
    htmlSelect.removeAttribute('disabled');
    btnReset.removeAttribute('disabled');
    resetear_juego();
    gameEnable=true;
}

const mostrarSiza = () =>{
    if(window.innerWidth<500)
        deshabilitarJuego();
    else if(!gameEnable)
        habilitarJuego();
}

window.addEventListener('resize',mostrarSiza);
