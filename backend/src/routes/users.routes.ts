import { Router, Request, Response } from "express";
import usersRepository from "../repositories/users.repository";
import defaultErrorHandler from "../errors/defaultErrorHandler";

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