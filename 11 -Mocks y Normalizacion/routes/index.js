const Router = require("express");
const faker = require("@faker-js/faker");

const router = Router();

faker.locale = 'es'

function generarProducto() {
  return {
    title: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    thumbnail:faker.image.imageUrl(),
  }
}



router.get("api/productos-test", (req, res) => {  
  const response = [];

  for (let i = 1; i<=5; i++){
    console.log(i);
    response.push(
       generarProducto()
    )
  }

  res.json(response);
});

module.exports = router;
