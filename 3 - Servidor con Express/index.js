const express = require('express')
const fs = require('fs')
const app = express()
const puerto = 8080
let arrayDeProductos = [];



class Contenedor {
    constructor(archivo) {
      this.archivo = archivo;
      
    }

    async getAll() {
        try {
          arrayDeProductos = JSON.parse(
            await fs.promises.readFile(`./${this.archivo}`, "utf-8")
          );
          //console.log(arrayDeProductos);
        } catch (error) {
          console.log(error);
        }
      }

}

const productos = new Contenedor("productos.txt");


app.get('/',(req,res)=>{
    
    res.send('<h3 style="color:blue">Bienvenido al servidor del desafio 3</h3>')
})

app.get('/productos', async (req, res)=>{

    await productos.getAll();    
    console.log(arrayDeProductos);
    res.json(arrayDeProductos);   
    
})

app.get('/productoRandom', async (req, res)=>{
  await productos.getAll(); 
  let product = {};
  const productoRandom = Math.floor(Math.random() * arrayDeProductos.length);
  product = arrayDeProductos[productoRandom];
  res.json(product);
  
})

app.listen(puerto, (error)=>{
    if(!error){
        console.log(`Servidor escuchando el puerto ${puerto}`);
    } else{
        console.log('Hubo un error al iniciar el servidor');
    }
})