import { Router } from "express";
import { getAllUsers, getOneByEmail, resetPassword, newPassword, changeRol } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:email", getOneByEmail);

router.post("/resetpassword", resetPassword);

router.post("/newpassword/:email", newPassword)

router.post("/premium/:email", changeRol)

export default router;
