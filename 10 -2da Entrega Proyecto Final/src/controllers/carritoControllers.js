import {CarritoDao} from "../daos/index.js";

const carrito = new CarritoDao();

const getNewCart = async (req, res) => {
  try {
    const resultado = await carrito.createCart();
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio un error por favor intente nuevamanete mas tarde",
      error
    );
    res.sendStatus(500);
  }
};
const deleteCart = async (req, res) => {
  try {
    let resultado = await carrito.deleteElement(req.params.id);
    if (!resultado) {
      res.send("El id de carrito no existe");
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(
      "Ocurrio un error por favor intente nuevamanete mas tarde", 
      error
    );
    res.sendStatus(500);
  }
};
const getCartProducts = async (req, res) => {
  try {
    let resultado = await carrito.readById(req.params.id);
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio un error por favor intente nuevamanete mas tarde", 
      error
    );
    res.sendStatus(500);
  }
};
const postProductToCart = async (req, res) => {
  try {

    let resultado = await carrito.saveInCart(req.params.id, req.body);
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio un error por favor intente nuevamanete mas tarde",
      error
    );
    res.sendStatus(500);
  }
};
const deleteProductFromCart = async (req, res) => {
  try {
    let resultado = await carrito.deleteFromCart(
      req.params.id,
      req.params.id_prod
    );
    console.log("Resultado: ", resultado);
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "Ocurrio un error por favor intente nuevamanete mas tarde",
      error
    );
    res.sendStatus(500);
  }
};

export {
  getNewCart,
  deleteCart,
  getCartProducts,
  postProductToCart,
  deleteProductFromCart,
};
