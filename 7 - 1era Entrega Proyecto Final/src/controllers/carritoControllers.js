const fs = require("fs");
const products = require ('./productsControllers')
let objetoProducto = {}
let carritos = []
let archivo = "carrito.txt";
let msj = []

class Carrito {
    constructor(){
        this.idCart = carritos.length + 1;
        this.timestamp = Date.now();
        this.productos = [];

    }

    async createCart(){
        carritos = JSON.parse(fs.readFileSync(archivo, "utf-8"))
        const carrito = new Carrito();                    
        carritos.push(carrito);
        let id = carrito.idCart;
        console.log(id);
        await fs.promises.writeFile(
            archivo, JSON.stringify(carritos, null,2));    
        return {id: id};
    }

    getCarts() {
        try{
          carritos = JSON.parse(fs.readFileSync(archivo, "utf-8"))
          return carritos       
           
        } catch (error){
            msj = { error: error.message }; 
        }
    }

    async saveCarts(){
        await fs.promises.writeFile(
            archivo, JSON.stringify(carritos, null,2));
    }

    getCartById(idCart) {
        try {
          carritos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
          let carritoBuscado = carritos.find((cart) => cart.idCart == idCart);
          return carritoBuscado;
        } catch (errorid) {
          console.log("lo siento, no se encontro el id");
        }
      }
    
      getProductsCart (idCart){
      try{
        carritos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
        let carritoBuscado = carritos.find((cart) => cart.idCart == idCart);        
        let productosCarrito = carritoBuscado.productos
        return productosCarrito
      }catch(error){
        console.log(error);
      }
    }

      async deleteCartPoductById(idCart, id){
        try{

          carritos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
          let carritoBuscado = carritos.find((cart) => cart.idCart == idCart); 
          let indexCart = carritos.findIndex((cart) => {return cart.idCart == idCart})       
          let productosCarrito = carritoBuscado.productos
          let productoEliminar = productosCarrito.find((prod) => prod.id == id)
          let productoIndex = productosCarrito.findIndex((prod) => {return prod.id == id})   
          let stockARetornar = productoEliminar.stock
          let productoModificado = products.getById(id)
          let stockActual = productoModificado.stock
          let stockmodificado = stockARetornar + stockActual
          productoModificado.stock = stockmodificado
          products.modifyProducts (productoModificado, id)
          productosCarrito.splice(productoIndex, 1)
          carritoBuscado.productos = productosCarrito
          carritos [indexCart] = carritoBuscado
          await fs.promises.writeFile(archivo, JSON.stringify(carritos, null,2));
          return [{ok: "producto eliminado"}]
        } catch (error){
          console.log(error);
        }



      }
    
    async deleteCart(idCart){
      try{

        carritos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
        let carritoBuscado = carritos.find((cart) => cart.idCart == idCart);
        let indexCart = carritos.findIndex((cart) => {return cart.idCart == idCart})       
        let productosCarrito = carritoBuscado.productos
        
        for (let i = 0; i < productosCarrito.length; i++) {
          
          let id = productosCarrito[i].id
          let stockARetornar = productosCarrito[i].stock
          let productoModificado = products.getById(id)
          let stockActual = productoModificado.stock
          let stockmodificado = stockARetornar + stockActual
          productoModificado.stock = stockmodificado
          products.modifyProducts (productoModificado, id)     
          
        }
        
        carritos.splice(indexCart, 1)
        await fs.promises.writeFile(archivo, JSON.stringify(carritos, null,2));
        return [{"ok":"Carrito eliminado exitosamente"}]
      } catch (error){
        console.log(error);
      }
    }

    async addProductCart (idCart, producto){
        try{
            console.log(idCart);
            carritos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
            console.log(carritos);
            let carritoASurtir =  carritos.find((cart) => cart.idCart == idCart);
            console.log(carritoASurtir);
            let indexCarrito = carritos.findIndex((prod) => {return prod.idCart == idCart;
            });               
            const {id, stock} = producto;
            
            objetoProducto = products.getById(id)
            let hayStock = objetoProducto.stock - stock;
            if (hayStock > 0){
                let producto = { id: id, timestamp: objetoProducto.timestamp, nombre: objetoProducto.nombre, descripcion: objetoProducto.descripcion, codigo: objetoProducto.codigo, foto: objetoProducto.foto, precio: objetoProducto.precio, stock: stock}
                carritoASurtir.productos.push(producto)
                carritos[indexCarrito]=carritoASurtir
                await fs.promises.writeFile(archivo, JSON.stringify(carritos, null,2));
                objetoProducto.stock = hayStock
                products.modifyProducts(objetoProducto, id)


            } else { console.log("lo siento, no hay suficiente stock");}

            return carritoASurtir

            
            } catch(error){
                return { error: "ocurrio un error, intente nuevamente"}                 
            }
    }


    /*
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
              } else {console.log('error: producto no encontrado');}
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
*/
}

module.exports = new Carrito 
    
