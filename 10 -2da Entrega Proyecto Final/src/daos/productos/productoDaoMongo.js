import ContenedorMongo from "../../contenedores/contenedorMongo.js";


export class ProductoDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", {
      timestamp: { type: String, required: true },
      nombre: { type: String, required: true },
      description: { type: String, required: true },
      codigo: { type: String, required: true },
      url: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

