import { Router } from "express";
import {
  home,
  getStudents,
  newStudents,
  updateStudents,
  deleteStudents,
  getStudent,
} from "../controllers/controllers.js";
const router = Router();

router.get("/", home)

router.get("/students", getStudents);

router.get("/student/:id", getStudent);

router.post("/students", newStudents);

router.patch("/students/:id", updateStudents);

router.delete("/students/:id", deleteStudents);

export default router;
