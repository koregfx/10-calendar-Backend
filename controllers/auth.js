const {response} = require('express')


const createUser = (req,res = response)=>{

    const {name, email, password} = req.body

    res.status(201).json({
        ok: true,
        type_of_request: 'register',
        name,
        email,
        password
    })
}

const loginUser = (req,res = response)=>{

    
    const {email, password} = req.body
    res.json({
        ok: true,
        type_of_request: 'login',
        email,
        password
    })
}

const renewToken = (req,res = response)=>{


    res.json({
        ok: true,
        type_of_request: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}