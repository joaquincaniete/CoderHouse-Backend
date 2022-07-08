const { Router } = require("express");
const router = Router();
const products = require ('../controllers/productsControllers')
const carts = require ('../controllers/carritoControllers');
const { addProductCart, getProductsCart, deleteCartPoductById, deleteCart } = require("../controllers/carritoControllers");
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
  
router.post('/productos', async (req, res)=>{ 
  if (esAdmin === true){
    res.json(await products.addProducts(req.body));
} else{
    res.json({error: -1, descripcion: `Ruta '${req.route.path}' Método '${req.route.stack[0].method}' - No Autorizada`})
}

  
})
router.put('/productos/:id', async (req, res)=>{

  if (esAdmin === true){
    products.modifyProducts(req.body, req.params.id)
    res.json( await products.modifyProducts(req.body, req.params.id));
} else{
    res.json({error: -1, descripcion: `Ruta '${req.route.path}' Método '${req.route.stack[0].method}' - No Autorizada`})
}
  
})
router.delete('/productos/:id', async (req, res)=>{  
  if (esAdmin === true){
    res.json(await products.deleteProduct(req.params.id)) 
    
} else{
    res.json({error: -1, descripcion: `Ruta '${req.route.path}' Método '${req.route.stack[0].method}' - No Autorizada`})
}

})

// carrito

router.post('/carrito', (req, res)=>{
  let carrito = carts.createCart()
  res.json(carrito)
})
router.post('/carrito/:id/productos', async (req, res)=>{
    let agregarProducto = await addProductCart(req.params.id, req.body)
    res.json(agregarProducto)

})
router.get('/carrito/:id/productos', (req, res)=>{
  let productosCarrito = getProductsCart(req.params.id)
  res.json(productosCarrito)
})
router.delete('/carrito/:id/productos/:id_prod', async (req, res)=>{
  let eliminar = await deleteCartPoductById(req.params.id, req.params.id_prod)
  res.json(eliminar)
})
router.delete('/carrito/:id', async (req, res)=>{
  let eliminar = await deleteCart(req.params.id)
  res.json(eliminar)
})


module.exports = router

