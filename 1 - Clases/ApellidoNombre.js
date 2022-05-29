// Desafio Entregable - Clases - Cañete Joaquin

// 1 Declarar una clase Usuario

class Usuario {
    //2 Hacer que usuario cuente con los siguientes atributos
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
// 3 hacer que usuario cuente con los siguientes metodos
    getFullName(){
       console.log(`${this.nombre} ${this.apellido}`) 
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        console.log(this.mascotas.length);
    }

    addBook(author, name){
        this.libros.push({nombre: name, 
            autor: author}
            );
    }

    getBookNames(){
        let names = (this.libros).map((books)=>books.nombre);        
        console.log(names);
    }



}

// 4 Crear un objeto llamado usuario con valores arbitrarios e invocar sus metodos 

const usu = new Usuario ("Joaquin", "Cañete");
usu.addMascota("perro");
usu.addMascota("gato");
usu.addBook("Isaac Asimov","Yo Robot");
usu.addBook("Stephen King", "it");
console.log(usu);
usu.getFullName();
usu.countMascotas();
usu.getBookNames();


