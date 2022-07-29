
import admin from "firebase-admin";
import config from "../daos/config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(coleccion) {
    this.coleccion = db.collection(coleccion);
  }

  async readAll() {
    const docs = await this.coleccion;
    const snapshot = await docs.get();
    let arrayProductos = [];
    snapshot.forEach((doc) => {
      let data = doc.data();
      let id = doc.id;
      arrayProductos.push({ ...data, id });
    });
    return arrayProductos;
  }

  async readById(id) {
    const doc = await this.coleccion.doc(id).get();
    const data = doc.data();
    return { ...data, id };
  }

  async createElement(elemento) {
    elemento.timestamp = new Date().toLocaleString("fr-FR");
    delete elemento.administrador;
    const newElement = this.coleccion.doc();
    await newElement.create(elemento);
    return;
  }

  async updateElement(id, elemento) {
    let resultado = "";
    resultado = await this.coleccion.doc(id).update(elemento);
    resultado = "OK";
    return resultado;
  }

  async deleteElement(id) {
    await this.coleccion.doc(id).delete();
    let resultado = "OK";
    return resultado;
  }

  async createCart() {
    const nuevoCarrito = { timestamp: "", productos: [] };
    nuevoCarrito.timestamp = new Date().toLocaleString("fr-FR");
    let resultado = await this.coleccion.add(nuevoCarrito);
    return resultado.id;
  }

  async saveInCart(idCart, elemento) {
    await this.coleccion.doc(idCart).update({
      productos: admin.firestore.FieldValue.arrayUnion(elemento),
    });
    let resultado = "OK";
    return resultado;
  }

  async deleteFromCart(idCart, idProduct) {
    let resultado;
    await db.runTransaction(async (t) => {
      const doc = await t.get(this.coleccion.doc(idCart));
      let arrayProductos = [];
      arrayProductos = doc.data().productos;
      const indiceEncontrado = arrayProductos.findIndex((producto) => {
        return producto.id === idProduct;
      });
      if (indiceEncontrado >= 0) {
        arrayProductos.splice(indiceEncontrado, 1);
        t.update(this.coleccion.doc(idCart), { productos: arrayProductos });
        resultado = `Producto ${idProduct}, eliminado de ${idCart}`;
      } else {
        resultado = "No se encontro el producto";
      }
    });
    return resultado;
  }
}

export default ContenedorFirebase;