import { Request, Response, Router } from "express";
import instructorRepository from "../repositories/instructors.repository";

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