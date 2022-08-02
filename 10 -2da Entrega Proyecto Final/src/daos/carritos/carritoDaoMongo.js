
import ContenedorMongo from "../../contenedores/contenedorMongo.js";


export class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}

