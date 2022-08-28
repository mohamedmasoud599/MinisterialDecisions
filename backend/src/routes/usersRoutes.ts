import { Router } from "express";
import { loginUser } from "../controllers/usersController";

const router = Router();

router.post("/login", loginUser);

export default router;
