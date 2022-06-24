const productos = []

const getHome = (req, res)=>{
    try{
        res.render('home.pug')
    } catch (error){
        console.log('error router home: ' + error);
        res.sendStatus(404)
    }
}

const getProducts = (req, res)=>{
    res.render('products.pug', {productos})
}

const addProducts = (req, res)=>{
    const { title, price, thumbnail } = req.body;
    let id = productos.length;
    try {
      productos.push({ title, price, thumbnail, id });
      res.redirect('/');
      res.status(201).render
      console.log(productos);
    } catch (error) {
      msj = { error: error.message };
    }
};


module.exports = {
    getHome,
    getProducts,
    addProducts,
}