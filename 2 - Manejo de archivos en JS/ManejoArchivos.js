// Desafio Entregable - Manejo de Archovos en JS - Cañete Joaquin

//imoprto archivos necesarios
const fs = require("fs");
let arrayDeProductos = [];
let objetoProducto = {};

// 1 Declarar una clase Contenedor

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    
  }

  async save(objeto) {
    try {
      objetoProducto = objeto;
      objetoProducto.id = arrayDeProductos.length + 1;
      arrayDeProductos.push(objetoProducto);
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(arrayDeProductos, null, 2)
      );
    } catch (error) {
      console.log(error);
    }

    
  }

  async getById(id) {
    try {
      arrayDeProductos = JSON.parse(
        await fs.promises.readFile(`./this.archivo`, "utf-8")
      );
      let producto = arrayDeProductos.find((prod) => prod.id === id);
      console.log(producto);
    } catch (errorid) {
      console.log("lo siento, no se encontro el id");
    }
  }

  async getAll() {
    try {
      arrayDeProductos = JSON.parse(
        await fs.promises.readFile(`./this.archivo`, "utf-8")
      );
      console.log(arrayDeProductos);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      arrayDeProductos = JSON.parse(
        await fs.promises.readFile(`./this.archivo`, "utf-8")).filter((producto)=>producto.id !=id);
        fs.writeFileSync(this.archivo, JSON.stringify(arrayDeProductos, null,2));
      
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
        arrayDeProductos = [];
      await fs.promises.writeFile(`./${this.archivo}`, arrayDeProductos);
    } catch (err) {
      console.log("error borrando elementos...");
    }
  }
}

// objetos para añadir

const arrayProductos = [
  {
    nombre: "champu",
    precio: "250",
  },
  {
    nombre: "yerba",
    precio: "500",
  },
  {
    nombre: "gaseosa",
    precio: "200",
  },
];

//creo el archivo
const productos = new Contenedor("productos.txt");
//agrego productos

for (let i = 0; i < arrayProductos.length; i++) {
  productos.save(arrayProductos[i]);
}

/*


//pido 1 producto
productos.getById(1);

//pido todos los productos
productos.getAll();

//elimino el producto
productos.deleteById(1);

//elimino todos los productos
productos.deleteAll();
*/
