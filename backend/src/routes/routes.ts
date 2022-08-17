import { Router } from "express";
import coursesRoutes from "./courses.routes";
import usersRoutes from "./users.routes";
import instructorsRoutes from "./instructors.routes";
import studentsRoutes from "./students.routes";

const router = Router();

router.use("/api/v1/instructors", coursesRoutes);
router.use("/api/v1/instructors", usersRoutes);
router.use("/api/v1/instructors", instructorsRoutes);
router.use("/api/v1/instructors", studentsRoutes);

export default router;