import { Router } from "express"; 
const router = Router();
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";
import {
  getNewCart,
  deleteCart,
  getCartProducts,
  postProductToCart,
  deleteProductFromCart,
} from "../controllers/carritoControllers.js";


const esAdmin = true  // variable para rol de admin

//productos

router.get('/productos/', getProducts);

router.get('/productos/:id', getProduct);
  
router.post('/productos', postProduct);

router.put('/productos/:id', putProduct);

router.delete('/productos/:id', deleteProduct)

// carrito

router.get('/carrito', getNewCart);

router.post('/carrito/:id/productos', postProductToCart);

router.get('/carrito/:id/productos', getCartProducts);

router.delete('/carrito/:id/productos/:id_prod', deleteProductFromCart);

router.delete('/carrito/:id', deleteCart);


export default router;

