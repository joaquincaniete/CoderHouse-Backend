const { Router } = require("express");
const router = Router();
const products = require ('../src/controllers/productsControllers')
const carts = require ('../src/controllers/carritoControllers');
const { addProductCart, getProductsCart, deleteCartPoductById, deleteCart } = require("../src/controllers/carritoControllers");
const esAdmin = true  // variable para rol de admin

//productos

router.get('/productos/', (req, res)=>{  
  let productos = products.getProducts()
  res.json(productos) 

})
router.get('/productos/:id', (req, res)=>{
  let producto = products.getById(req.params.id)
  res.json(producto) 

})
  
router.post('/productos', (req, res)=>{ 
  if (esAdmin === true){
    res.json(products.addProducts(req.body));
} else{
    res.json({error: -1, descripcion: `Ruta '${req.route.path}' Método '${req.route.stack[0].method}' - No Autorizada`})
}

  
})
router.put('/productos/:id', (req, res)=>{

  if (esAdmin === true){
    products.modifyProducts(req.body, req.params.id);
    res.redirect('/');
} else{
    res.json({error: -1, descripcion: `Ruta '${req.route.path}' Método '${req.route.stack[0].method}' - No Autorizada`})
}
  
})
router.delete('/productos/:id', (req, res)=>{  
  if (esAdmin === true){
    res.json(products.deleteProduct(req.params.id)) 
    
} else{
    res.json({error: -1, descripcion: `Ruta '${req.route.path}' Método '${req.route.stack[0].method}' - No Autorizada`})
}

})

// carrito

router.post('/carrito', (req, res)=>{
  let carrito = carts.createCart()
  res.json(carrito)
})
router.post('/carrito/:id/productos', (req, res)=>{
    let agregarProducto = addProductCart(req.params.id, req.body)
    res.json(agregarProducto)

})
router.get('/carrito/:id/productos', (req, res)=>{
  let productosCarrito = getProductsCart(req.params.id)
  res.json(productosCarrito)
})
router.delete('/carrito/:id/productos/:id_prod', (req, res)=>{
  let eliminar = deleteCartPoductById(req.params.id, req.params.id_prod)
  res.json(eliminar)
})
router.delete('/carrito/:id', (req, res)=>{
  let eliminar = deleteCart(req.params.id)
  res.json(eliminar)
})


module.exports = router

