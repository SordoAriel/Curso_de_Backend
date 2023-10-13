import Router from 'express';
import {messagesManager} from '../dao/MessagesManager.js'

const router = Router();

router.post("/", async (req, res) => {
    const {user, message} = req.body
    if(!user || ! message){
        return res.status(400).json({message: 'Faltan datos obligatorios'})
    }
    try {
        const newMsj = await messagesManager.add(req.body)
        res.status(200).json({message: 'Mensaje añadido a la base de datos', data: newMsj})
    } catch (error) {
        res.status(500).json({error: error.message} )
    }
})

export default router
