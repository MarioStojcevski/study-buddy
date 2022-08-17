import { Request, Response, Router } from "express";
import courseRepository from "../repositories/courses.repository";

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
      console.log(err);
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
      console.log(err);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      console.log(err)
    }
  })
  .put("/", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      console.log(err)
    }
  })
  .delete("/", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      console.log(err)
    }
  });

export default router;