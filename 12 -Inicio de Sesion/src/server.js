const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { Server: IOServer } = require("socket.io");
const {faker} = require ("@faker-js/faker")
const {normalize, schema, denormalize} = require('normalizr')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")


const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({mongoUrl:'mongodb+srv://joaquincaniete:portland@cluster0.c5k2p.mongodb.net/?retryWrites=true&w=majority', mongoOptions: mongoOptions}),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60000,
    }
}))

app.get('/', (req, res)=>{
  req.session.user = req.query.name;

  res.redirect("http://localhost:8080/productos.html");
})

app.get('/productos', (req, res)=>{
  res.render(path.join(process.cwd(), '../public/productos'), {usuario: req.session.user})
  console.log(req.session.user);
})

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

//pruductos con fakerJS

function generarProducto() {
  return {
    title: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    thumbnail:faker.image.imageUrl(),
  }
}



app.get("/api/productos-test" , (req, res) => {
  
  const response = [];

  for (let i = 1; i<=5; i++){
    response.push(generarProducto())
  }

  res.json(response);
});

app.get("/productos.html", (req, res)=>{
  
  res.redirect("/loguin.html")
})

app.get("/*", (req, res)=>{
  res.redirect("/loguin.html")
})



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



  socket.on("cliente:mensaje", (message) => {
    mensajes.push(message);
    console.log(mensajes);
    save("mensajes.txt", mensajes)
    io.emit("server:mensajes", normalizedPost);
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

  //normalizo los mensajes

const author = new schema.Entity("author", {}, { idAttribute: "id" });

const fechaYHora = new schema.Entity('fecha')

const mensaje = new schema.Entity(
  "mensaje",
  { author: author },
  { idAttribute: "id" },
  { fecha: fechaYHora}
);

const schemaMensajes = new schema.Entity(
  "mensajes",
  {
    mensajes: [mensaje],
  },
  { idAttribute: "id" }
);

const normalizedPost = normalize(
  { id: "mensajes", mensajes: JSON.parse(fs.readFileSync("mensajes.txt", "utf-8")) },
  schemaMensajes
);


