const express = require('express');
const cors = require('cors')
require('dotenv').config()

const { dbConnection } = require('./db/connfig');


//Crear el Servidor de express
const app = express()


// Base de Datos
dbConnection();


// Cors
app.use(cors())

//Directorio Publico
app.use( express.static('public') )

// Lectura y parseo del body
app.use(express.json())





//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'))

//TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'))



// Escuchar peticiones
app.listen( process.env.PORT , ()=>{
    console.log(`el servidor corre en el puerto ${process.env.PORT}`)
})