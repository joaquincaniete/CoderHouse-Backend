const fs = require("fs");
let objetoProducto = {}
let productos = []
let archivo = "productos.txt";
let msj = []

class Producto {
    constructor(nombre, descripcion, codigo, foto, precio, stock){
        this.id = productos.length + 1;
        this.timestamp = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }

    async addProducts (producto){
        try{
            productos = JSON.parse(fs.readFileSync(archivo, "utf-8"))
            const {nombre, descripcion, codigo, foto, precio, stock} = producto;
            const objetoProducto = new Producto (nombre, descripcion, codigo,foto, precio,stock);                    
            productos.push(objetoProducto);
            await fs.promises.writeFile(
                archivo, JSON.stringify(productos, null,2));
            return { ok: "producto agregado exitosamente"} 
            } catch(error){
                return { error: "ocurrio un error, intente nuevamente"}                 
            }
    }

    getProducts () {
        try{
          productos = JSON.parse(fs.readFileSync(archivo, "utf-8"))
          return productos
          
           
        } catch (error){
            msj = { error: error.message }; 
        }
    }

    getById(id) {
        try {
          productos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
          let producto = productos.find((prod) => prod.id == id);
          return producto;
        } catch (errorid) {
          console.log("lo siento, no se encontro el id");
        }
      }

      async modifyProducts (productoModif, id){
        try{
            productos = JSON.parse(fs.readFileSync(archivo, "utf-8"))
            const {nombre, descripcion, codigo, foto, precio, stock} = productoModif;
            let producto = productos.findIndex((prod) => {
              return prod.id == id;
            });               
            if (producto != -1){
              productos[producto].nombre = nombre;
              productos[producto].descripcion = descripcion;
              productos[producto].codigo = codigo;
              productos[producto].foto = foto;
              productos[producto].precio = precio;
              productos[producto].stock = stock;

              await fs.promises.writeFile(
                archivo, JSON.stringify(productos, null,2));

                msj = { ok: "producto modificado exitosamente"} 
              
              } else { msj = { error: "ocurrio un error, por favor intente nuevamente"} }

              return msj

            } catch(error){
                console.log(error);
            }
    }
    async deleteProduct (id){
      try{
          productos = JSON.parse(fs.readFileSync(archivo, "utf-8"))

          let producto = productos.findIndex((prod) => {
            return prod.id == id;
          });               
          if (producto != -1) {
            productos.splice(producto, 1);
            await fs.promises.writeFile(
              archivo, JSON.stringify(productos, null,2));
              msj = { ok: "producto eliminado exitosamente"}              
              return msj      
            } else {
              msj = { error: "error producto no encontrado"}  
              return msj
          }            
          } catch(error){
              console.log(error);
          }
  }

}

module.exports = new Producto    
    
