import { Router } from "express";
import { getAllUsers, getOneByEmail, resetPassword, newPassword, changeRol, addDocuments, deleteUser, deleteInactiveUsers } from "../controllers/users.controller.js";
import { cpUpload } from "../middlewares/multer.middleware.js";
import { authorizationMiddleware } from "../middlewares/middlewares.js"

const router = Router();

router.get("/", getAllUsers);

router.get("/:email", getOneByEmail);

router.post("/resetpassword", resetPassword);

router.post("/newpassword/:email", newPassword)

router.post("/premium/:email", changeRol)

router.post("/:id/documents", cpUpload, addDocuments)

router.delete("/:email", authorizationMiddleware(["admin"]), deleteUser)

router.delete("/", authorizationMiddleware(["admin"]), deleteInactiveUsers)

export default router;
