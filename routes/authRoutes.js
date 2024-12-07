// routes/authRoutes.js
import { Router } from "express";
import {
  register,
  login,
  def,
  allusers,
  dltuser,
  addProblem,
  updateProblem,
  getAllProblems,
} from "../controllers/authController.js";

const router = Router();

router.post("/add",addProblem);
router.get("/show",getAllProblems);
router.put("/update/:id",updateProblem);
router.post("/register", register);
router.post("/login", login);
router.get("/users", allusers);
router.delete("/users/:id", dltuser);
router.get("/", def);

export default router;
