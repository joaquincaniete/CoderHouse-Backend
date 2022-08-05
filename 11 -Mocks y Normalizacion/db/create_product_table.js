const database = require('./database').mysqlConnection

const createProductTable = async()=>{
    try{
        await database.schema.createTable('products', pTable=>{
            pTable.increments('id').primary()
            pTable.string('titulo', 100).notNullable()
            pTable.string('thumbnail', 255).notNullable()
            pTable.string('price', 10).notNullable()
        })
        console.log('tabla creada');
        //database.destroy();

    } catch(err){
        console.log(err)
        //database.destroy();
}}

module.exports = createProductTable;
