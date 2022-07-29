import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

//CLASS EXTENDS
class CartDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }
}

export default CartDaoFirebase;