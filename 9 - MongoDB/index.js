//mongo
//creo la db
use ecommerce
//creo las collections
db.createCollection('mensajes')
db.createCollection('productos')
//inserto mensajes
db.mensajes.insertMany([
    {
      "mail": "joaquincaniete@gmail.com",
      "fecha": "28/06/2022 23:22.46",
      "mensaje": "hola"
    },
    {
      "mail": "joaquincaniete@gmail.com",
      "fecha": "28/06/2022 23:22.54",
      "mensaje": "todo bien"
    },
    {
      "mail": "quique@gmail.com",
      "fecha": "28/06/2022 23:23.25",
      "mensaje": "ey"
    },
    {
      "mail": "alguien@gmail.com",
      "fecha": "28/06/2022 23:58.59",
      "mensaje": "mirando el inventario..."
    },
    {
      "mail": "alguien@gmail.com",
      "fecha": "28/06/2022 23:59.13",
      "mensaje": "Tienen escalimetros?"
    },
    {
      "mail": "joaquincaniete@gmail.com",
      "fecha": "29/06/2022 17:56.48",
      "mensaje": "Prueba antes de subir"
    },
    {
      "mail": "prueba@gmail.com",
      "fecha": "29/06/2022 17:57.13",
      "mensaje": "todo ok!"
    },
    {
        "mail": "prueba@gmail.com",
        "fecha": "29/06/2022 17:58.11",
        "mensaje": "ok!"
    },
    {
        "mail": "prueba@gmail.com",
        "fecha": "29/06/2022 17:59.13",
        "mensaje": "bien!"
    },
    {
        "mail": "prueba@gmail.com",
        "fecha": "29/06/2022 18:00.18",
        "mensaje": "funciona!"
    }
  ])
  // inserto productos
  db.productos.insertMany([
    {
      "nombre": "gaseosa",
      "descripcion": "coca cola light",
      "codigo": "1250",
      "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
      "precio": 120,
      "stock": 600
    },
    {
      "nombre": "gaseosa",
      "descripcion": "sprite",
      "codigo": "1250",
      "foto": "https://lachimbotana.com.ar/wp-content/uploads/2020/06/Sprite500-1.jpg",
      "precio": 120,
      "stock": 700
    },
    {
      "nombre": "gaseosa",
      "descripcion": "coca cola light",
      "codigo": "1250",
      "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
      "precio": 120,
      "stock": 1000
    },
    {
      "nombre": "coquita",
      "descripcion": "coca cola light",
      "codigo": "1250",
      "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
      "precio": 100,
      "stock": 1500
    },
    {
        "nombre": "Lapiz",
        "descripcion": "lapicito",
        "codigo": "122",
        "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
        "precio": 100,
        "stock": 1500
      },
      {
        "nombre": "Escuadra",
        "descripcion": "escuadra a 45",
        "codigo": "1250",
        "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
        "precio": 306,
        "stock": 100
      },
      {
        "nombre": "Escalimetro",
        "descripcion": "de 30cm",
        "codigo": "1210",
        "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
        "precio": 675,
        "stock": 20
      },
      {
        "nombre": "Set",
        "descripcion": "Set de reglas y escuadras",
        "codigo": "1110",
        "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
        "precio": 3750,
        "stock": 20
      },
      {
        "nombre": "Estilografos",
        "descripcion": "set con varios espesores",
        "codigo": "1211",
        "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
        "precio": 5000,
        "stock": 20
      },
      {
        "nombre": "tintas",
        "descripcion": "varios colores en presentacion de 300 ml",
        "codigo": "1810",
        "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
        "precio": 498,
        "stock": 250
      }

  ])

//ver msjs y productos
db.mensajes.find().pretty() 
db.productos.find().pretty() 

//contar msjs y productos
db.mensajes.find().count()
db.productos.find().count()

//CRUD EN PRODUCTOS
//insertar un producto mas
db.productos.insertOne({
    "nombre": "Goma",
    "descripcion": "Goma Blanca Blanda para borrar en papel blanco",
    "codigo": "1806",
    "foto": "https://imagenes.elpais.com/resizer/jxWyWm_7T6ytRJjEX0o_zaSGh2I=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/B6S32GKTCZILLYQOBHUU24Q3A4.jpg",
    "precio": 199,
    "stock": 250
  })
  //consultas por nombre especifico de producto
  db.productos.find({nombre: 'tintas'}).pretty()
  //valores de precio menores a 1000
  db.productos.find({precio: {$lt: 1000}}).pretty()
  //valores de precio entre 1000 y 3000
  db.productos.find({$and: [{precio: {$gte: 1000}}, {precio: {$lte: 3000}}]}).pretty()
  //precios mayores a 3000
  db.productos.find({precio: {$gt: 3000}}).pretty()
  //nombre del 3er producto mas barato
  db.productos.find({}, {nombre: 1, _id: 0}).sort({precio: 1}).limit(1).skip(2).pretty()
  //actualizacion a todos los productos con stock a 100
  db.productos.updateMany({}, {$set: {'stock': 100}})
  //stock a 0 todos los productos con precio mayor a 4000
  db.productos.updateMany({precio: {$gt: 4000}}, {$set: {stock: 0}})
  //borrar productos con precio menor a 1000
  db.productos.deleteMany({precio: {$lt: 1000}})

  // CREAR USUARIO

  use admin 
  db.createUser({user: 'pepe', pwd: 'asd456', roles:[{role: 'read', db: 'ecommerce'}]})
  db.getUsers()
  exit 

  //inicio con usuario
  //reinicio servidor para habilitar autenticacion: mongod -auth --dbpath ./base
  mongo -u pepe -p asd456 //ingreso con usuario





