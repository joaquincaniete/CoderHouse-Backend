import connection from "../daos/config.js";
import mongoose from "mongoose";


await mongoose.connect(connection.mongodb.connectionString);


class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async readAll() {
    const docs = await this.coleccion.find({}, { __v: 0 });
    return docs;
  }

  async readById(id) {
    const doc = await this.coleccion.findById(id, { __v: 0 });
    return doc;
  }

  async createElement(elemento) {
    elemento.timestamp = new Date().toLocaleString("fr-FR");
    const nuevoElemento = new this.coleccion(elemento);
    let nuevoElementoGuardado = await nuevoElemento.save();
    return nuevoElementoGuardado;
  }

  async updateElement(id, elemento) {
    let resultado;
    await this.coleccion
      .findByIdAndUpdate(id, elemento, function (error, doc) {
        if (error) {
          resultado = error;
        } else {
          resultado = doc;
        }
      })
      .clone();
    return resultado;
  }

  async deleteElement(id) {
    let resultado;
    await this.coleccion
      .findByIdAndDelete(id, {}, function (error, doc) {
        if (error) {
          resultado = error;
        } else {
          resultado = doc;
        }
      })
      .clone();
    return resultado;
  }

  async createCart() {
    const nuevoCarrito = { timestamp: "", productos: [] };
    let resultado = await this.guardar(nuevoCarrito);
    return resultado.id;
  }

  async saveInCart(idCart, elemento) {
    let resultado;
    let tempCart = await this.listarUno(idCart);
    if (tempCart) {
      tempCart.productos.push(elemento);
      await this.actualizar(idCart, tempCart);
      resultado = "Producto agregado en carrito correctamente";
    } else {
      resultado = "El id de carrito no existe";
    }
    return resultado;
  }

  async deleteFromCart(idCart, idProduct) {
    let resultado;
    let tempCart = await this.listarUno(idCart);
    if (tempCart) {
      let arrayProducts = tempCart.productos;
      const indiceEncontrado = arrayProducts.findIndex((producto) => {
        return producto._id === idProduct;
      });
      if (indiceEncontrado >= 0) {
        arrayProducts.splice(indiceEncontrado, 1);
        await this.coleccion.findByIdAndUpdate(idCart, {
          productos: arrayProducts,
        });
        resultado = `Producto con ID ${idProduct}, eliminado correctamente del cart con ID ${idCart}`;
      } else {
        resultado = "El carrito es correcto pero el producto no existe";
      }
    } else {
      resultado = "El carrito no existe";
    }
    return resultado;
  }
}

export default ContenedorMongo;
