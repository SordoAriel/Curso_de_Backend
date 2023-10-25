import { Router } from "express";
import { usersManager } from "../dao/DB/Managers/usersManager.js";

const router = Router()

router.post("/signup", async (req, res)=>{
    const newUser = await usersManager.add(req.body)
    res.status(200).json({message: 'Usuario creado', newUser})
})

router.post('/login', async (req, res)=>{
    const { email, password } = req.body
    try {
        const existingUser = await usersManager.findByEmail(email)
    if(!existingUser){
        res.status(400).json({message: 'Usuario no encontrado'})
    }
    req.session["email"] = email;
    req.session["firstName"] = existingUser.firstName;
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.session["isAdmin"] = true;
    }
    res.status(200).redirect('http://localhost:8080/products')
    } catch (error) {
        return error
    }
    
}) 

export default router;
