import { Router } from "express";
import {
  getDecisions,
  getDecision,
  postDecision,
} from "../controllers/decisionsController";
// import { protect, protectAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getDecisions);

router.get("/:id", getDecision);

router.post("/", postDecision);

export default router;
