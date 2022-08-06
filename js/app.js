//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Eventos
eventListeners();

function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    //cuando el documento esta listo

    document.addEventListener("DOMContentLoaded", ()=>{
        //asignalo como un arreglo vacio si no existe tweets 
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        crearHTML();
    });
}

//Funciones
function agregarTweet(evt){
    evt.preventDefault();

    //textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;

    //validacion
    if(tweet === ""){
        mostrarError("Un mensaje no puede ir vacio");
        return; // evita que se ejecuten las siguiente lineas de codigo
    }

    //tener un id unico par cada tweet con date.now();
    tweetObj = {
        id : Date.now(),
        //se puede pasar un unico valor cuando son iguales llave y valor
        //tweet
        texto: tweet,
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];


    //agregar HTML con los tweets
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

function mostrarError(error){
    //evitar que el mensaje se repita muchas veces
    const errorExiste = document.querySelector(".error");
    if (errorExiste) {
        return;
    }
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    //Insertar en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);
    //Mostrarlo durante cierto tiempo
    setTimeout(()=>{
        mensajeError.remove();
    },3000)
}

//muestra el arreglo de los tweets
function crearHTML(){
    //limpiando HTML
    limpiarHTML();

    if(tweets.length>0){
        tweets.forEach((e)=>{
            //agregar el boton para borrar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent = "X";

            //eliminar del DOM
            btnEliminar.onclick = () =>{
                borrarTweet(e.id);
            }

            //crear el html
            const li = document.createElement("li");

            //añadir el texto
            li.innerText = e.texto;

            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Agrega los tweets al localStorage
function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//eliminar el tweet

function borrarTweet(id){
    tweets = tweets.filter(tweet =>{
        return tweet.id !== id;
    });

    crearHTML();
}