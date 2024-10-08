// routes/authRoutes.js
import { Router } from "express";
import { register, login, def } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", def);

export default router;
