import { Router, Request, Response } from "express";
import studentsRepository from "../repositories/students.repository";

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
      console.log(err);
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      
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
  .put("/:id", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      console.log(err)
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      console.log(err)
    }
  });

export default router;