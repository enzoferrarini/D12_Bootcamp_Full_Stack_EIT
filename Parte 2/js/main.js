//DESAFÍO N° 12 - PARTE N° 2 - FERRARINI ENZO
// TEMATICA Y LINKS SE ENCUNETRAN EN EL FOOTER
let gameEnable=true;
let htmlSelect;
let btnReset;
let btnAddColor;
let btnDeleteColor;
//ARRAY INICIAL DE COLORES CDO NO HAY COLORES ALMACENADOS EN LOCALSTORAGE
let colores=['#008000', '#FF00FF','#FF0000','#dca900'];
let cicurlos=document.getElementsByClassName("circle");
let chkSuperpuesto=document.getElementById("idChkSuperpuesto");
let selectorColor=document.getElementById("idSelectorColor");
let footer=document.getElementsByClassName("footer")[0];
footer.innerHTML="<span>Temática elegida: <strong>Venta de Entradas</strong></span>" +footer.innerHTML;
//EL JUEGO SE INICIALIZA POR DEFECTO CON 4 CIRUCLOS. 
let cantCiruclosIniciales=4;



//DESCOMENTAR SIGUIENTE LINEA EN CASO DE QUE DESEE RESETEAR LA VARIABLE DEL STORAGE
//localStorage.removeItem('colores');

const crearCirculos =(cant) =>{
    let htmlCircles="";
    let contador=1;
    for (let index = 0; index < cant; index++) {
        htmlCircles=htmlCircles.concat('<div id="c'+contador+'" class="circle c'+contador+'">');
        contador++;
    }
    for (let index = 0; index < cant; index++) {
        htmlCircles=htmlCircles.concat('</div>');      
    }
    
    let ciruclosContainer= document.getElementsByClassName('circulos')[0];
    ciruclosContainer.innerHTML=htmlCircles;
    addEventListenerCirculos();

}

const construirSelector=()=>{    
    let contador=1;
    if(localStorage.getItem("colores"))
    {
        colores=JSON.parse(localStorage.getItem("colores"));
    }

    htmlSelect='<select name="colores" id="idSelectorColores">';
    htmlSelect= htmlSelect.concat('<option value="">Seleccione un color</option>');
    for (let index = 0; index < colores.length; index++) {
        htmlSelect= htmlSelect.concat('<option style="color:'+colores[index]+'" value="'+colores[index]+'"> Color N° '+contador+' </option>');
        contador++;
    }
    htmlSelect= htmlSelect.concat('</select>');
    htmlSelect= htmlSelect.concat('<input disabled style="width: 10px;" type="text" id="idInputColor" name="idColorSeleccionado"></input>');
    
    return htmlSelect;
}

const set_color_input=() => {   
    document.getElementById('idInputColor').style.backgroundColor=htmlSelect[htmlSelect.selectedIndex].value;
}

const limpiarCirculos = () => {
    for (let index = 0; index < cicurlos.length; index++) 
        cicurlos[index].style.backgroundColor="white";   
}

const add_color = () => {    
    // let newColor="";
    let newColor= prompt("Ingrese el Nuevo color (en formato Hexadecimal y sin comillas - Ej #ff0062) que desea agregar:")
    
    if(newColor!=null)
    {
        if(newColor.trim()=="")
            alert("No ha ingresado ningun color...")
        else{
            if(!colores.includes(newColor))
                {
                    colores.push(newColor);
                    limpiarCirculos();
                    actualizarLS();
                    selectorColor.innerHTML=construirSelector();
                    document.getElementById('idSelectorColores').addEventListener('change',set_color_input);
                    htmlSelect=document.getElementById("idSelectorColores");
                    htmlSelect.selectedIndex=0;  
                }
            else
                alert("El color ingresado ("+newColor+") ya se encuentra en la paleta de colores. Ingrese uno distinto...");
    
        }
    }
}

const del_color = () => {
    if(htmlSelect.selectedIndex==0)   
        alert('Para eliminar un color, debe seleccionar uno de ellos previamente...');   
    else{
        limpiarCirculos();
        colores.splice(htmlSelect.selectedIndex-1, 1);
        actualizarLS();
        selectorColor.innerHTML=construirSelector();
        document.getElementById('idSelectorColores').addEventListener('change',set_color_input);
        htmlSelect=document.getElementById("idSelectorColores");
        htmlSelect.selectedIndex=0;  
        alert('Se ha removido el color exitosamente');
    }      
}

const resetear_juego = () => {    
    limpiarCirculos();
    htmlSelect.selectedIndex=0;  
    chkSuperpuesto.checked=false; 
    document.getElementById('idInputColor').style.backgroundColor="";
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
document.getElementById('idSelectorColores').addEventListener('change',set_color_input);
crearCirculos(cantCiruclosIniciales);

let buttonsCollection= document.getElementsByTagName("button");
for (let index = 0; index < buttonsCollection.length; index++) {
    if(buttonsCollection[index].innerText=="Resetear juego")
    {
        buttonsCollection[index].addEventListener('click', resetear_juego);
        btnReset=buttonsCollection[index];       
    }else  if(buttonsCollection[index].innerText=="Añadir Color")
    {
        buttonsCollection[index].addEventListener('click', add_color);
        btnAddColor=buttonsCollection[index];       
    }
    else  if(buttonsCollection[index].innerText=="Eliminar Color")
    {
        buttonsCollection[index].addEventListener('click', del_color);
        btnDeleteColor=buttonsCollection[index];       
    }
}

//CONTROL DE SIZE_W <500
const deshabilitarJuego=() => {
    chkSuperpuesto.setAttribute('disabled', '');
    htmlSelect.setAttribute('disabled', '');
    btnReset.setAttribute('disabled', '');
    btnAddColor.setAttribute('disabled', '');
    btnDeleteColor.setAttribute('disabled', '');
    document.getElementById("idCantidadCirculos").setAttribute('disabled', '');
    gameEnable=false;
    for (let index = 0; index < cicurlos.length; index++) 
        cicurlos[index].style.backgroundColor="lightgray";   
   
}
const habilitarJuego=() => {
    chkSuperpuesto.removeAttribute('disabled');
    htmlSelect.removeAttribute('disabled');
    btnReset.removeAttribute('disabled');
    btnAddColor.removeAttribute('disabled');
    btnDeleteColor.removeAttribute('disabled');
    document.getElementById("idCantidadCirculos").removeAttribute('disabled');
    resetear_juego();
    gameEnable=true;
}

const mostrarSiza = () =>{
    if(window.innerWidth<500)
        deshabilitarJuego();
    else if(!gameEnable)
        habilitarJuego();
}

const actualizarLS = () =>{
    localStorage.setItem("colores", JSON.stringify(colores));
}

const resetCircels = () =>{ 
    crearCirculos(document.getElementById("idCantidadCirculos").value);
};

window.addEventListener('resize',mostrarSiza);
document.getElementById("idCantidadCirculos").addEventListener('change', resetCircels);
