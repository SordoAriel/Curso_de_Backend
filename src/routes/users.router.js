import { Router } from "express";
import { getAllUsers, getOneByEmail, resetPassword, newPassword, changeRol, addDocuments } from "../controllers/users.controller.js";
import { cpUpload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:email", getOneByEmail);

router.post("/resetpassword", resetPassword);

router.post("/newpassword/:email", newPassword)

router.post("/premium/:email", changeRol)

router.post("/:id/documents", cpUpload, addDocuments)

export default router;
