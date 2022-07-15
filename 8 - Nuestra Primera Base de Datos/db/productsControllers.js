class Contenedor {
    constructor(database, tabla){
        this.database = database;
        this.tabla = tabla;        
    }

    async addProducts (producto){
        try{
            await this.database(this.tabla).insert(producto);
                
            console.log('producto agregado',producto); 
            } catch(error){
                console.log('ocurrio un error el producto no se pudo agregar', producto);                
            }}

    async getProducts () {
        try{
          let productos = await this.database.from(this.table).select('*');
          return productos
                     
        } catch (err){
          
          if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1' )) {
            const createTable = require(`../db/create_product_table`);
            await createTable();
            return [];
        } else{
          console.log('Error no se pudo leer lista de productos', err);
        }
        
    }
  }






}

module.exports = {
  Contenedor : Contenedor,
}