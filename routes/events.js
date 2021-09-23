/*

    Events 
    /api/event

*/

const { Router } = require('express')
const { check } = require('express-validator')

const { createEvent, getEvents, actualizeEvent, deleteEvent } = require('../controllers/events')
const { validateJWT } = require('../middleware/validateJWT')
const { validateFields } = require('../middleware/validateFields')
const { isDate } = require('../helpers/isDate')

const router = Router()

router.use(validateJWT)


// Obtener eventos
router.get('/', getEvents)

// crear nuevo evento
router.post(
    '/',
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'start date is required').custom( isDate ),
        check('end', 'start date is required').custom( isDate ),
        validateFields

    ],
     createEvent)

// actualizar evento
router.put('/:id', actualizeEvent)

// eliminar evento
router.delete('/:id', deleteEvent)

module.exports = router