// Desafio Entregable - Manejo de Archovos en JS - Cañete Joaquin

//imoprto archivos necesarios
const fs = require('fs')


// 1 Declarar una clase Contenedor

class Contenedor {
    
    constructor(archivo){
        this.archivo = archivo;
        async function crear (){
            await fs.promises.writeFile(`./${archivo}`,'[]')
        }
        crear();
        
    }

    async save(objeto){ 
        let data = await fs.promises.readFile(`./${this.archivo}`,'utf-8')
        if (!data){
            const obj ={
                ...objeto,
                id : 1
            }
            
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(array))
        } else{
            data = JSON.parse(data);
            objeto.id = data.length
            try{
                data.push(obj)
                await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(data))
                console.log(objeto.id);
            } catch (guardado)
            {
                console.log(`ocurrio un error ${guardado}`);
            }
        }

    }

    
    async getById(id){
        try{

            let productos = JSON.parse (await fs.promises.readFile(`./this.archivo`, 'utf-8'))
            let producto = productos.find(prod => prod.id === id)
            console.log(producto);
        } catch(errorid){
            console.log('lo siento, no se encontro el id');
        }

    }
    
    async getAll(){
        
        let productos = JSON.parse (await fs.promises.readFile(`./this.archivo`, 'utf-8'))
        console.log(productos);
    }
    
    async deleteById(id){
        let productos = JSON.parse (await fs.promises.readFile(`./this.archivo`, 'utf-8'))
        let producto = productos.findIndex(objeto.id == id);
        if(producto === -1){
            console.log('lo siento no se encontra id');

        } else {
            productos.splice(producto,1);
            await fs.promises.writeFile(`./${this.archivo}`, productos);
            console.log('se ha borrado el producto');
        }

        }
        
    async deleteAll(){
        try{
            await fs.promises.writeFile(`./${this.archivo}`,'')
        } catch (err){
            console.log('error borrando elementos...');
        }
            
        }
     
        
}

// objetos para añadir

const obj1 = [
    {
        nombre: 'champu',
        precio: '250'
    },
    
]
const obj2 = [
    
    {
        nombre: 'yerba',
        precio: '500'
    }
   

]
const obj3 = [
    
    {
        nombre: 'gaseosa',
        precio: '200'
    }

]
/*
//creo el archivo 
const productos = new Contenedor ('archivo.txt')
//agrego productos
productos.save(obj1);

productos.save(obj2);
productos.save(obj3);

//pido 1 producto
productos.getById(1);

//pido todos los productos
productos.getAll();

//elimino el producto
productos.deleteById(1);

//elimino todos los productos
productos.deleteAll();
*/
