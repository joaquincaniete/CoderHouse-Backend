let usuario

const userInputName = document.getElementById('userInputName')

userInputName.addEventListener('submit', event =>{
    event.preventDefault()
    usuario = document.getElementById('name').value
    console.log(usuario);

const url = `http://localhost:8080/?name=${usuario}`

fetch(url)
.then (response => response.json())
.then(data =>{
 console.log(data);
    
})
.catch(err => console.log(err))
    //userLogued(usuario)
    window.location.href ="/productos.html"

})