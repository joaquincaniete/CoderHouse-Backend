const dotenv = require("dotenv")
const yargs = require('yargs')(process.argv.slice(2))

dotenv.config()

const TIEMPO_EXPIRACION = 20000;

const args = yargs
.alias({        
        p: 'puerto',        
    })
    .default({       
        puerto: 8080,        
    }).argv;

module.exports = {
	puerto: args.puerto,
	TIEMPO_EXPIRACION,
	dbURL: process.env.URL_BASE_DE_DATOS,
	secretCookie: process.env.SECRET,
}
