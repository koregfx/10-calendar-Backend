const express = require('express');
require('dotenv').config()



//Crear el Servidor de express
const app = express()


//Directorio Publico
app.use( express.static('public') )

// Lectura y parseo del body
app.use(express.json())




//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'))

//TODO: CRUD: Eventos




// Escuchar peticiones
app.listen( process.env.PORT , ()=>{
    console.log(`el servidor corre en el puerto ${process.env.PORT}`)
})