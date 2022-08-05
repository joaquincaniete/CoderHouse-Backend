const database = require('./database').sqliteConnection;

const createMessageTable = async () => {
    try {
        await database.schema.createTable('messages', messagesTable => {
            messagesTable.increments('id').primary();
            messagesTable.string('mail', 100).notNullable();
            messagesTable.string('fecha', 50).notNullable();
            messagesTable.string('mensaje', 200).notNullable();
        });

        console.log('tabla de mensajes creada'); 

        database.destroy();
    } catch(err) {
        console.log(err);
        database.destroy();
    }
}

module.exports = createMessageTable;