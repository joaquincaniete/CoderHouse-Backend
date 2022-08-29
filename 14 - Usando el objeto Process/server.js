require('dotenv').config()
const express = require("express");
const exphbs = require("express-handlebars");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const { Server: IOServer } = require("socket.io");
const {faker} = require ("@faker-js/faker")
const {normalize, schema, denormalize} = require('normalizr')
const routes = require("./routes");
const config = require("./config");
const controllersdb = require("./controllersdb");
const User = require("./models");
const app = express();


//const puerto = process.env.PUERTO  //en archivo de ambiente


app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

const port = config.puerto;

app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//BD MONGO y Server

controllersdb.conectarDB(config.dbURL, (err) => {
  if (err) return console.log("error en conexión de base de datos", err);
  console.log("BASE DE DATOS CONECTADA");
  
});

const expressServer = app.listen(port, (err) => {
  if (err) return console.log("error en listen server", err);
  console.log(`Server running on port ${port}`);
});

const io = new IOServer(expressServer);



//constantes necesarias

let productos = [];
let mensajes =  [];
let productosExiste = false
let mensajesExiste = false

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





//session

app.use(
  session({
    secret: config.secretCookie,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: config.TIEMPO_EXPIRACION,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
);

function hashPassword (password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

function isValidPassword(reqPassword, dbPassword){
  return bcrypt.compareSync(reqPassword, dbPassword)
}

//Passport

app.use(passport.initialize());
app.use(passport.session())

const registerStrategy = new LocalStrategy({passReqToCallback: true}, 
  async (req, username, password, done)=>{
    try{

      const existingUser = await User.findOne({username}) //busco si existe el usuario
      
      if (existingUser){
        return done("User already exist", null)  //si existe devuelve error
      }
      // si no existe crea el objeto nuevo usuario con todos sus datos y contraseña hasheada
      const newUser = {           
        username,
        password: hashPassword(password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
      //persiste el usuario en la base de datos

      const createdUser = await User.create(newUser);
      
      done(null, createdUser); //devuelve el usuario creado
    } catch (err){
      console.log("Error registering user", err);
      done("Error in register", null)
    }

});

const loginStrategy = new LocalStrategy(async (username, password, done)=>{
  try{
    const user = await User.findOne({username});

    if(!user || !isValidPassword(password, user.password)){
      return done('Invalid Credential')
    }

    done(null, user);


  }catch(err){
    console.log("Error loguin", err);
    done("Error loguin", null)
  }
});

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done)=>{
  done(null, user._id)
})

passport.deserializeUser((id, done)=>{
  User.findById(id, done);
})

app.get("/", routes.getRoot);

//  LOGIN
app.get("/login", routes.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);
app.get("/faillogin", routes.getFaillogin);

//  REGISTER
app.get("/register", routes.getSignup);
app.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  routes.postSignup
);
app.get("/failsignup", routes.getFailsignup);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { user } = req;
  console.log(user);
  res.send("<h1>Ruta OK!</h1>");
});

//  LOGOUT
app.get("/logout", routes.getLogout);

//  FAIL ROUTE
app.get("*", routes.failRoute);


