//constantes necesarias

const socket = io()

const formInputProductos = document.getElementById("formInputProductos")
const productoInput = document.getElementById("productoInput")
const precioInput = document.getElementById("precioInput")
const urlInput = document.getElementById("urlInput")
const formPoductosHeader = document.getElementById('formProductosHeader')

const formInputMessage = document.getElementById("formInputMessage")
const emailInput = document.getElementById('emailInput')
const msgInput = document.getElementById('msgInput')
const messages = document.getElementById('messages')
let timeNow

//Eventos necesarios

formInputProductos.addEventListener('submit', event =>{
    event.preventDefault()
    const producto = {titulo: productoInput.value, thumbnail: urlInput.value, price: precioInput.value }
    sendProduct(producto)
})

formInputMessage.addEventListener('submit', event=>{
    event.preventDefault()
    timeMssg()
    console.log(timeNow);
    const message = {mail: emailInput.value, fecha: timeNow, mensaje: msgInput.value}
    sendMessg(message)
})


//Funciones Necesarias

function sendProduct(producto){
    socket.emit('cliente:producto', producto)
}

function sendMessg(message){
    socket.emit('cliente:mensaje', message)
}

function timeMssg (){
    let tiempo = new Date()
    let dia = time2Fix(tiempo.getDate())
    let mes = time2Fix(tiempo.getMonth()+1)
    let anio = tiempo.getFullYear()
    let hora = time2Fix(tiempo.getHours())
    let minutos = time2Fix(tiempo.getMinutes())
    let segundos = time2Fix(tiempo.getSeconds())

    //(DD/MM/YYYY HH:MM.SS)
   
    timeNow = `${dia}/${mes}/${anio} ${hora}:${minutos}.${segundos}`
    
}

function time2Fix(dato){
    let fixTime = '0'+dato

    return fixTime.substring(fixTime.length-2);
}

async function renderProductos(productos){

    document.querySelector('#productos').innerHTML = ""
    const productosHeader = await fetch('/encabezado.hbs')
    const encabezado = await productosHeader.text()
    const response = await fetch('/plantilla.hbs')
    const plantilla = await response.text()
    formPoductosHeader.innerHTML = encabezado

    productos.forEach(producto => {
        const template = Handlebars.compile(plantilla);
        const html = template(producto);
        document.querySelector('#productos').innerHTML += html;        
    });
 
}



socket.on('server:productos', productos=>{
    console.log(productos);
           renderProductos(productos)        
})

socket.on('server:mensajes', mensajes=>{
            renderMessages(mensajes)
})


function renderMessages(mensajes){
    const html = mensajes.map(msgInfo=>{
        return (`<div> <span style="color:Blue;"><strong>${msgInfo.mail}</strong></span><span style="color:Brown;">${msgInfo.fecha}:</span>
            <span style="color:Green"><em>${msgInfo.mensaje}</em></span></div>`)
    }).join(" ");
    console.log(`HTML `, html);
    messages.innerHTML = html;

}