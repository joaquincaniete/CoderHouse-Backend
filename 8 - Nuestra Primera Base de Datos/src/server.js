const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { Server: IOServer } = require("socket.io");
const {Contenedor} = require('../db/productsControllers')
const {ContenedorMsj} = require('../db/messagesControllers')

const expressServer = app.listen(8080, () => {
  console.log("Escuchando puerto 8080"); 
});
const io = new IOServer(expressServer);

//carpeta de archivos estaticos

app.use(express.static(path.join(__dirname, "../public")));

const productsDB = require('../db/database').mysqlConnection;
const container = new Contenedor(productsDB, 'products');

const messagesDB = require('../db/database').sqliteConnection;
const containerMsj = new ContenedorMsj(messagesDB, 'messages')

// funciones para manejar los sockets

io.on("connection", async (socket) => {
  console.log("Se conecto un cliente");  

  let productos = await container.getProducts();
  let mensajes = await containerMsj.getMessages();

  socket.emit("server:productos", productos);
  socket.emit("server:mensajes", mensajes);

  socket.on("cliente:producto", async (producto) =>{
    //productos.push(producto);
    console.log(producto);
    await container.addProducts(producto)
    productos = await container.getProducts();
    io.emit("server:productos",productos);
  });

  socket.on("cliente:mensaje", async (message) => {
    
    console.log(mensajes);
    await containerMsj.addMessage(message);
    mensajes = await containerMsj.getMessages();
    io.emit("server:mensajes", mensajes);
  });
});



