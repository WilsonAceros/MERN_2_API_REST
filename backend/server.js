import express from 'express';
import {consulta_coleccion, insertar_documento, actualizar_documento, actualizar_documentos, eliminar_documento, eliminar_documentos} from './db.js';
import path from 'path';

const app = express();
const dir_backend = path.resolve();
const dir_frontend = path.join(dir_backend, '../frontend');


app.listen('8000', function(peticion, respuesta){
    console.log("Servidor iniciado");
})


//Asignar la ruta a una variable
// const raiz = "/MinTic/Ciclo4_MERN/Code/MERN_2_API_REST";

//Agregar todos los archivos al servidor para que los reconozca
app.use(express.static(dir_frontend));

//Comunicación entre el cliente y el servidor
app.get('/', function(peticion, respuesta){
    respuesta.sendFile(dir_frontend+"/formulario.html")
})

/*Metodo GET*/
// app.get('/agregarUsuario', function(peticion, respuesta){
//     console.log("Prueba de URL");
    // insertar_documento();
// })


/*Metodo GET*/
// app.get('/agregarUsuario/:nombre/:apellido/:telefono/:correo/:contrasena', function(peticion, respuesta)
// {
//     let nombre = peticion.params.nombre;
//     let apellido = peticion.params.apellido;
//     let telefono = peticion.params.telefono;
//     let correo = peticion.params.correo;
//     let contrasena = peticion.params.contrasena;
//     insertar_documento(nombre, apellido, telefono, correo, contrasena);
//     console.log(nombre + " " + apellido + " " + telefono + " " + correo + " " + contrasena);
//     respuesta.redirect('/');
// })

app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*METODO POST*/
app.post('/agregarUsuario', function(peticion, respuesta){
    let {nombre, apellido, telefono, correo, contrasena} = peticion.body;
    console.log("Verificando POST");
    console.log(nombre + " " + apellido + " " + telefono + " " + correo + " " + contrasena);
    insertar_documento(nombre, apellido, telefono, correo, contrasena);
    respuesta.redirect('/');
})

app.set('view engine', 'ejs');
app.set('views', dir_frontend + '/vistas');


/*Consulta todos los usuarios de la base de datos con el metodo GET*/
app.get('/consultarUsuario', function(peticion, respuesta){
    let documentos = consulta_coleccion();
    documentos.then(value => {
        console.log(value);
        respuesta.render("archivo_dinamico", {mensaje: value});
    })
})