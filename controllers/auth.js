const {response} = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')


const createUser = async (req,res = response)=>{

    const {email, password} = req.body
    try{
        
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({
                ok:false,
                msg: 'there is already a user whit this email'
            })
        }
        user = new User(req.body);


        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt )

    
        await user.save();
        
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            msg: 'user Registered',
            user:{
                uid: user.id,
                name: user.name
            },
            token
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            ok:false,
            msg: 'Please contact whit the administrator'
        })
    }
}

const loginUser = async(req,res = response)=>{

    
    const {email, password} = req.body

    try {
        

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({
                ok:false,
                msg: 'User or password not match'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword)
        {
            return res.status(400).json({
                ok:false,
                msg: 'User or password not match'
            })
        }

        const token = await generateJWT(user.id, user.name)

        res.json({
            ok: true,
            msg: 'login done',
            user:{
                uid: user.id,
                name: user.name
            },
            token

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            ok:false,
            msg: 'Please contact whit the administrator'
        })
    }
}

const renewToken = async(req,res = response)=>{


    const token = await generateJWT(req.uid, req.name)
    res.json({
        ok: true,
        type_of_request: 'renew',
        token,
        user:{
            uid: req.uid,
            name: req.name
        },
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}