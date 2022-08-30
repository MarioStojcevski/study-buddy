import { Router } from "express";
import coursesRoutes from "./courses.routes";
import usersRoutes from "./users.routes";
import instructorsRoutes from "./instructors.routes";
import studentsRoutes from "./students.routes";
import categoriesRoutes from "./categories.routes";

const router = Router();

router.use("/api/v1/categories", categoriesRoutes);
router.use("/api/v1/courses", coursesRoutes);
router.use("/api/v1/users", usersRoutes);
router.use("/api/v1/instructors", instructorsRoutes);
router.use("/api/v1/students", studentsRoutes);

export default router;