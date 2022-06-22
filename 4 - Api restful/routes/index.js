const { Router } = require("express");
const router = Router();

const productos = [];

router.get("/productos", (req, res) => {
  res.json(productos);
});

router.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  let id = productos.length;
  try {
    productos.push({ title, price, thumbnail, id });
    res.send(productos[productos.length - 1]);
  } catch (error) {
    msj = { error: error.message };
  }
});
router.get("/productos/:id", (req, res) => {
  try {
    let producto = productos.find((prod) => prod.id == req.params.id);
    let msj;
    if (producto) {
      msj = producto;
    } else {
      msj = { error: "producto no existe" };
    }

    res.send(msj);
  } catch (error) {
    msj = { error: "ocurrio un error, por favor intente nuevamente mas tarde" };
  }
});

router.put("/productos/:id", (req, res) => {
  try {
    let producto = productos.findIndex((prod) => {
      return prod.id == req.params.id;
    });
    const { title, price, thumbnail } = req.body;
    let id = +req.params.id;
    let msj;

    if (producto != -1) {
      productos[producto] = { title, price, thumbnail, id };
      msj = { ok: "producto actualizado exitosamente" };
    } else {
      msj = { error: "producto no encontrado" };
    }
    res.send(msj);
  } catch (error) {
    msj = { error: "ocurrio un error, por favor intente nuevamente mas tarde" };
  }
});

router.delete("/productos/:id", (req, res) => {
  try {
    let producto = productos.findIndex((prod) => {
      return prod.id == req.params.id;
    });
    let msj;
    console.log(producto);
    if (producto != -1) {
      productos.splice(producto, 1);
      msj = { ok: "producto eliminado exitosamente" };
    } else {
      msj = { error: "producto no encontrado" };
    }
    res.send(msj);
  } catch (error) {
    msj = { error: "ocurrio un error, por favor intente nuevamente mas tarde" };
  }
});

module.exports = router;
