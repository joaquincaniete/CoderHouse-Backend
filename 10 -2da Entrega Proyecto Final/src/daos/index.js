import dotenv from "dotenv";
dotenv.config();

let ProductoDao;
let CarritoDao;

switch (process.env.DATABASE) {
  case "firebase":
    const { ProductoDaoFirebase } = await import(
      "./productos/productoDaoFirebase.js"
    );
    
    const { CartDaoFirebase } = await import(
      "./carritos/carritoDaoFirebase.js"
    );
    

    ProductoDao = ProductoDaoFirebase;
    CarritoDao = CartDaoFirebase;

    break;
  case "mongo":
    const { ProductoDaoMongo } = await import(
      "./productos/productoDaoMongo"
    ); 
    
    const { CarritoDaoMongo } = await import(
      "./carritos/carritoDaoMongo"
    );
    

    ProductoDao = ProductoDaoMongo;
    CarritoDao = CarritoDaoMongo;

    break;
}

export { ProductoDao, CarritoDao };