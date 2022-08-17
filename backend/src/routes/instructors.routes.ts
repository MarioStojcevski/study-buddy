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
      
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .put("/:id", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
      defaultErrorHandler(err);
    }
  });

export default router;