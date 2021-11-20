import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/data_base1', {})
.then(()=> console.log("Conexion a MongoDB data_base1"))
.catch((error) => console.log("Error: " + error))

//Definir el esquema
const usuarios_esquema = new mongoose.Schema({
    Nombre: String,
    Apellido: String,
    Telefono: Number,
    Correo: String,
    Contrasena: String
},{versionKey: false});

//Definir el modelo
const usuarios_modelo = mongoose.model('usuarios', usuarios_esquema);

//Consulta de Colección
const consulta_coleccion = async () => {
    const documentos = await usuarios_modelo.find();
    // console.log(documentos);
    return documentos;
}

// consulta_coleccion();


//Insertar un documento

const insertar_documento = async (nombre, apellido, telefono, correo, contrasena) => {
    const documentos = new usuarios_modelo({
        Nombre: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Correo: correo,
        Contrasena: contrasena
    });
    await documentos.save();
}

// insertar_documento();

export {consulta_coleccion, insertar_documento, actualizar_documento, actualizar_documentos, eliminar_documento, eliminar_documentos};


//Actualizar un registro de un documento con el ID

const actualizar_documento = async (ident) => {
    const documentos = await usuarios_modelo.updateOne({_id:ident},
    {
        $set:{
            Nombre:"Francisco",
            Correo:"francisco@gmail.com"
        }
    })
}

// actualizar_documento('618fde02ef1639799be82b3b');



//Actualizar varios registros de un documento, con una condición específica que se repita

const actualizar_documentos = async (ident) => {
    const documentos = await usuarios_modelo.updateMany({Nombre:ident},
    {
        $set:{
            Apellido:"Alfredo",
            Correo:"alfredo@gmail.com"
        }
    })
}

// actualizar_documentos('Juan');


/*Eliminar un documento*/

const eliminar_documento = async (ident) => {
    const documentos = await usuarios_modelo.deleteOne({_id:ident});
}

// eliminar_documento('618fde49c25089026a852714');


/*Eliminar varios registros de un documento*/

const eliminar_documentos = async (ident) => {
    const documentos = await usuarios_modelo.deleteMany({Apellido:ident});
}

// eliminar_documentos('Aceros');