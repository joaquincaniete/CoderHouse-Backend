
import {ProductoDao} from "../daos/index.js";


const getProducts = async (req, res) => {
  try {
    const resultado = await ProductoDao.readAll();
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error, por favor intentelo nuevamente mas tarde",
      error
    );
    res.sendStatus(500);
  }
};
const getProduct = async (req, res) => {
  try {
    const resultado = await ProductoDao.readById(req.params.id);
    if (!resultado) {
      res.send("El id de producto no existe");
    } else {
      res.send(resultado);
    }
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error, por favor intentelo nuevamente mas tarde",
      error
    );
    res.sendStatus(500);
  }
};
const postProduct = async (req, res) => {
  try {
    await ProductoDao.createElement(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error, por favor intentelo nuevamente mas tarde",
      error
    );
    res.sendStatus(500);
  }
};
const putProduct = async (req, res) => {
  try {
    let resultado = await ProductoDao.updateElement(req.params.id, req.body);
    if (!resultado) {
      res.send("El id de producto no existe");
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error, por favor intentelo nuevamente mas tarde",
      error
    );
    res.sendStatus(500);
  }
};
const deleteProduct = async (req, res) => {
  try {
    let resultado = await ProductoDao.deleteElement(req.params.id);
    if (!resultado) {
      res.send("El id de producto no existe");
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error, por favor intentelo nuevamente mas tarde",
      error
    );
    res.sendStatus(500);
  }
};

//export
export { getProducts, getProduct, postProduct, putProduct, deleteProduct }; 
    
