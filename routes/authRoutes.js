// routes/authRoutes.js
import { Router } from "express";
import {
  register,
  login,
  def,
  allusers,
  dltuser,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", allusers);
router.delete("/users/:id", dltuser);
router.get("/", def);

export default router;
