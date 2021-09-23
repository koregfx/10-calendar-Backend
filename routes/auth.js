/*
    Rutas de Usuarios / Auth
    host + /api/auth/
*/


const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middleware/validateFields');
const { validateJWT } = require('../middleware/validateJWT');


router.post(
    '/new', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('name', 'The name must be at least 4 characters').isLength({min:4}),
        check('email', 'The name is required').not().isEmpty(),
        check('email', 'The email is incorrect').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({min:6}),
        validateFields
    ], 
    createUser
);

router.post(
    '/',
    [
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({min:6}),
        check('email', 'The name is required').not().isEmpty(),
        check('email', 'The email is incorrect').isEmail(),
        validateFields
    ],
    loginUser
);

router.get('/renew', validateJWT, renewToken)

module.exports = router