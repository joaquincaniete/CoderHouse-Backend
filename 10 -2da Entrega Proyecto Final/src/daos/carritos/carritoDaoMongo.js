
import ContenedorMongo from "../../contenedores/contenedorMongo.js";


class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("compras", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}

export default CarritoDaoMongo;