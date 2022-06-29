const express = require('express');
const app = express();
const routes = require('./routes/index');
const path = require('path');
const {engine} = require ('express-handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}))



//configuracion handlebars
app.use(express.static('public'))
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, `./views/layout`),
    partialsDir: path.join(__dirname, `./views/partials`)
}))

//carpeta de plantillas
app.set('views', path.join(__dirname, './views'));
// engine 
app.set('view engine', 'hbs');

app.use('/', routes);

//enciendo el server
app.listen(8080,()=>{
    console.log("servidor escuchando puerto 8080");
});