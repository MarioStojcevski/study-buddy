import { Router, Request, Response } from "express";
import studentsRepository from "../repositories/students.repository";
import defaultErrorHandler from "../errors/defaultErrorHandler";

const router = Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const students = await studentsRepository.findAll();
      res.status(200).json({
        status: "sucessfully fetched",
        students: students
      });
    } catch(err: any) {
      defaultErrorHandler(err);
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const student = await studentsRepository.findById(+req.params.id);
      res.status(200).json({
        status: "successfully fetched",
        student: student
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const newStudentUser = await studentsRepository.add(req.body as any);
      res.status(201).json({
        status: "successfully added",
        student: newStudentUser
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .put("/:id", async (req: Request, res: Response) => {
    try {
      const studentUserToUpdate = {
        studentid: +req.params.id,
        ...req.body
      }
      const updatedStudentUser = await studentsRepository.update(studentUserToUpdate as any);
      res.status(201).json({
        status: "successfully updated",
        student: updatedStudentUser
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const deletedUser = await studentsRepository._delete(+req.params.id);
      res.status(204).json({
        status: "sucessfully deleted",
        user: deletedUser
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  });

export default router;