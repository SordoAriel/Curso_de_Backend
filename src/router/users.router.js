import { Router } from "express";
import { usersManager } from "../dao/DB/Managers/usersManager.js";

const router = Router()

router.get("/", async (req, res) => {
    const users = await usersManager.get()
    res.status(200).json({message: users})
})

router.get("/:email", async (req, res) => {
    const {email } = req.params
    const user = await usersManager.findByEmail(email)
    res.status(200).json({message: user})
})

export default router;
