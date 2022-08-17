import express, { Request, Response, NextFunction } from "express";
import courseRepository from "../repositories/courses.repository";

const router = express.Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const courses = await courseRepository.selectAllCourses();
      res.status(200).json({
        status: "successfully fetched",
        courses: courses
      });
    } catch(err: any) {
      console.log(err);
    }
})

export default router;