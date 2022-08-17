import { Router, Request, Response } from "express";
import usersRepository from "../repositories/users.repository";
import defaultErrorHandler from "../errors/defaultErrorHandler";
import coursesRepository from "../repositories/courses.repository";

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
  .get("/admins", async (req: Request, res: Response) => {
    try {
      const admins = await usersRepository.findAllAdmins();
      res.status(200).json({
        status: "sucessfully fetched",
        admins: admins
      });
    } catch(err: any) {
      defaultErrorHandler(err);
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await usersRepository.findById(+req.params.id);
      res.status(200).json({
        status: "successfully fetched",
        user: user
      })
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const newUser = await usersRepository.add(req.body as any);
      res.status(201).json({
        status: "sucessfully added",
        user: newUser
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .put("/:id", async (req: Request, res: Response) => {
    try {
      const userToUpdate = {
        id: +req.params.id,
        ...req.body
      }
      const updatedUser = await usersRepository.update(userToUpdate as any);
      res.status(201).json({
        status: "successfully updated",
        user: updatedUser
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const deletedUser = usersRepository._delete(+req.params.id);
      res.status(204).json({
        status: "successfully deleted",
        user: deletedUser
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  });

export default router;