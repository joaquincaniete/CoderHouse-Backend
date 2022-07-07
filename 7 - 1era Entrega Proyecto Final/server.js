require('dotenv').config()
const fs = require("fs");
const express = require ('express')
const app = express()
const rutas = require('./routes/index')
const puerto = process.env.PUERTO  //en archivo de ambiente


//constantes necesarias

let productos = [];
let carrito =  [];
let productosExiste = false
let mensajesExiste = false


//compruebo archivos

if (fs.existsSync('productos.txt')){
    productosExiste = true
    console.log('Existe archivo de productos');
} else {console.log('No existe archivo de productos');
fs.writeFileSync ("productos.txt", JSON.stringify(productos, null, 2))
}

if (fs.existsSync('carrito.txt')){
    mensajesExiste = true
    console.log('Existe archivo de carrito');
} else{console.log('No existe archivo de mensajes');
fs.writeFileSync ("carrito.txt", JSON.stringify(carrito, null, 2))
}

// cargo los mensajes y productos existentes
if (productosExiste == true){
    productos = JSON.parse(fs.readFileSync("productos.txt", "utf-8"))
    
}
if (mensajesExiste == true){
    mensajes = JSON.parse(fs.readFileSync("carrito.txt", "utf-8"))
    
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use ('/api', rutas)


app.listen(puerto, ()=>{
    console.log("servidor escuchando el puerto 8080");
})