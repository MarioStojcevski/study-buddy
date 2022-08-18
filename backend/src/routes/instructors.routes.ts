import { Request, Response, Router } from "express";
import instructorRepository from "../repositories/instructors.repository";
import defaultErrorHandler from "../errors/defaultErrorHandler";

const router = Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const instructors = await instructorRepository.findAll();
      res.status(200).json({
        status: "sucessfully fetched",
        instructors: instructors
      });
    } catch(err: any) {
      defaultErrorHandler(err);
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const instructor = await instructorRepository.findById(+req.params.id);
      res.status(200).json({
        status: "successfully fetched",
        instructor: instructor
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const newInstructorUser = await instructorRepository.add(req.body as any);
      res.status(201).json({
        status: "successfully added",
        instructor: newInstructorUser
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .put("/:id", async (req: Request, res: Response) => {
    try {
      const instructorToUpdate = {
        instructorid: +req.params.id,
        ...req.body
      }
      const updatedInstructorUser = await instructorRepository.update(instructorToUpdate as any);
      res.status(201).json({
        status: "successfully updated",
        instructor: updatedInstructorUser
      })
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const deletedInstructor = await instructorRepository._delete(+req.params.id);
      res.status(204).json({
        status: "successfully deleted",
        instructor: deletedInstructor
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  });

export default router;