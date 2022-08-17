import { Router, Request, Response } from "express";
import usersRepository from "../repositories/users.repository";

const router = Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const users = await usersRepository.findAll();
      res.status(200).json({
        status: "sucessfully fetched",
        users: users
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