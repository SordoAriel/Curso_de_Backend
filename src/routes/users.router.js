import { Router } from "express";
import { getAllUsers, getOneByEmail } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:email", getOneByEmail);

export default router;
