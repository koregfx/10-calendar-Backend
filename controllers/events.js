const { response, request } = require('express')
const Event = require('../models/Event')

const getEvents = async(req,res= response)=>{

    const events = await Event.find()
                                    .populate('user','name');

    
    res.json({
        ok: true,
        msg: 'get Events',
        events
    })
}


const createEvent = async(req,res= response)=>{
   
    const event = new Event(req.body)

    try {


        event.user = req.uid
        const eventDB = await event.save()

        res.json({
            ok:true,
            eventDB
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok:false,
            msg: 'Talk to the administrator'
        })
    }


}


const actualizeEvent = async (req,res= response)=>{
    


    const eventId = req.params.id;
    const uid = req.uid;


    try {
        const eventDB = await Event.findById(eventId)

        if(!eventDB)
        {
            return res.status(404).json({
                ok:false,
                msg: 'there is no event Whit this id'
            })
        }

        if(eventDB.user.toString() !== uid)
        {
            return res.status(401).json({
                ok:false,
                msg: 'You dont have license to edit this event'
            })
        }


        const newEvent = {
            ...req.body,
             user:uid
        }
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent,{new:true})
        res.json({
            ok:true,
            event: eventUpdated
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok:false,
            msg: 'Talk to the administrator'
        })
    }

}


const deleteEvent = async (req,res= response)=>{

    const eventId = req.params.id;
    const uid = req.uid;


    try {
        const eventDB = await Event.findById(eventId)

        if(!eventDB)
        {
            return res.status(404).json({
                ok:false,
                msg: 'there is no event Whit this id'
            })
        }

        if(eventDB.user.toString() !== uid)
        {
            return res.status(401).json({
                ok:false,
                msg: 'You dont have license to delete this event'
            })
        }

        const eventUpdated = await Event.findByIdAndDelete(eventId)
        
        res.json({
            ok:true,
            msg: `deleted event ${eventId}`
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok:false,
            msg: 'Talk to the administrator'
        })
    }
}

module.exports={
    getEvents,
    createEvent,
    actualizeEvent,
    deleteEvent
}