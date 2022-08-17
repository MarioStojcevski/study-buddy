import { Request, Response, Router } from "express";
import courseRepository from "../repositories/courses.repository";
import defaultErrorHandler from "../errors/defaultErrorHandler";

const router = Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const courses = await courseRepository.findAll();
      res.status(200).json({
        status: "successfully fetched!",
        courses: courses
      });
    } catch(err: any) {
      defaultErrorHandler(err);
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const course = await courseRepository.findById(+req.params.id);
      res.status(200).json({
        status: "sucessfully fetched!",
        course: course
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const newCourse = await courseRepository.add(req.body as any);
      res.status(201).json({
        status: "sucessfully added",
        course: newCourse
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .put("/:id", async (req: Request, res: Response) => {
    try {
      const courseToUpdate = {
        id: +req.params.id,
        ...req.body
      }
      const updatedCourse = await courseRepository.update(courseToUpdate as any);
      res.status(201).json({
        status: "sucessfully updated",
        course: updatedCourse
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const deletedCourse = await courseRepository._delete(+req.params.id);
      res.status(204).json({
        status: "sucessfully deleted",
        course: deletedCourse
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  });

export default router;