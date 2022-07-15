class ContenedorMsj {
    constructor(database, tabla){
        this.database = database;
        this.tabla = tabla;        
    }

    async addMessage (mensaje){
        try{
            await this.database(this.tabla).insert(mensaje);
                
            console.log('mensaje agregado',mensaje); 
            } catch(error){
                console.log('ocurrio un error el mensaje no se pudo agregar', mensaje);                
            }}

    async getMessages () {
        try{
          let mensajes = await this.database.from(this.table).select('*');
          return mensajes
                     
        } catch (err){
          
          if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1' )) {
            const createTable = require(`../db/create_message_table`);
            await createTable();
            return [];
        } else{
          console.log('Error no se pudo leer lista de productos', err);
        }
        
    }
  }

}

module.exports = {
  ContenedorMsj : ContenedorMsj,
}