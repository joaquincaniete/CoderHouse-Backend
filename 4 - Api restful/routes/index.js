const {Router} = require('express')
const router = Router()

const productos = []




router.get('/productos', (req, res)=>{
    res.json(productos)
})

router.post('/productos', (req,res)=>{
    const{title, price, thumbnail} = req.body
    let id = productos.length
    try{
        productos.push({title, price, thumbnail, id})
        res.send(productos[productos.length-1])
    }
    catch (error){
        msj = {error: error.message}
    }
})
router.get('/productos/:id', (req, res)=>{
    let producto = productos.find(prod => prod.id == req.params.id);
    let msj;
    if (producto){
        try{
            msj = producto;
        } catch (error){
            msj = {error: "ocurrio un error, por favor intente nuevamente mas tarde"}
    }
    } else{msj = {error: "producto no existe"}
        
    }

    res.send(msj)
})

router.put('/productos/:id', (req,res)=>{
    let producto = productos.findIndex((prod) => { return prod.id == req.params.id});
    const{title, price, thumbnail} = req.body
    let id = +req.params.id
    let msj;

    if (producto != -1){
        try{

            productos[producto]={title, price, thumbnail, id};
            msj = {ok: "producto actualizado exitosamente"}
        } catch(error) {
            msj = {error: "ocurrio un error, por favor intente nuevamente mas tarde"}
        }        
    } else {
        msj = {error: "producto no encontrado"}
    }
    res.send(msj)
})

router.delete('/productos/:id', (req,res)=>{
    let producto = productos.findIndex((prod) => { return prod.id == req.params.id});
    let msj;
    console.log(producto);
    if (producto != -1){
        try{

            productos.splice(producto, 1);
            msj = {ok: "producto eliminado exitosamente"}
        } catch(error) {
            msj = {error: "ocurrio un error, por favor intente nuevamente mas tarde"}
        
    } }
    else {
        
        msj = {error: "producto no encontrado"}
    }
    res.send(msj)
})



module.exports = router