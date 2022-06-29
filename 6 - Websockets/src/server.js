const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { Server: IOServer } = require("socket.io");

const expressServer = app.listen(8080, () => {
  console.log("Escuchando puerto 8080"); 
});
const io = new IOServer(expressServer);

//constantes necesarias

let productos = [];
let mensajes =  [];
let productosExiste = false
let mensajesExiste = false

//carpeta de archivos estaticos

app.use(express.static(path.join(__dirname, "../public")));

//compruebo archivos

if (fs.existsSync('productos.txt')){
    productosExiste = true
    console.log('Existe archivo de productos');
} else {console.log('No existe archivo de productos');}

if (fs.existsSync('mensajes.txt')){
    mensajesExiste = true
    console.log('Existe archivo de mensajes');
} else{console.log('No existe archivo de mensajes');}

// cargo los mensajes y productos existentes
if (productosExiste == true){
    productos = JSON.parse(fs.readFileSync("productos.txt", "utf-8"))
    
}
if (mensajesExiste == true){
    mensajes = JSON.parse(fs.readFileSync("mensajes.txt", "utf-8"))
    
}


// funciones para manejar los sockets

io.on("connection", async (socket) => {
  console.log("Se conecto un cliente");  
  socket.emit("server:productos", productos);
  socket.emit("server:mensajes", mensajes);

  socket.on("cliente:producto", (producto) =>{
    productos.push(producto);
    save("productos.txt", productos) 
    io.emit("server:productos",productos);
  });

  socket.on("cliente:mensaje", (message) => {
    mensajes.push(message);
    console.log(mensajes);
    save("mensajes.txt", mensajes)
    io.emit("server:mensajes", mensajes);
  });
});

// funciones necesarias para manejar archivos

async function save(archivo, array) {
    try {  
      await fs.promises.writeFile(archivo, JSON.stringify(array, null, 2));
    } catch (error) {
      console.log(error);
    }    
  }


