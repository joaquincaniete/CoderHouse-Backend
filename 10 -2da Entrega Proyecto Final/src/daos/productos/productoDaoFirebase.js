//IMPORT
import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

//CLAS EXTENDS
class ProductoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

export default ProductoDaoFirebase;