import { Request, Response, Router } from "express";
import courseRepository from "../repositories/courses.repository";
import defaultErrorHandler from "../errors/defaultErrorHandler";
import categoriesRepository from "../repositories/categories.repository";

const router = Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const categories = await categoriesRepository.findAll();
      res.status(200).json({
        status: "successfully fetched!",
        categories: categories
      });
    } catch(err: any) {
      defaultErrorHandler(err);
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const category = await categoriesRepository.findById(+req.params.id);
      res.status(200).json({
        status: "sucessfully fetched!",
        category: category
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const newCategory = await categoriesRepository.add(req.body as any);
      res.status(201).json({
        status: "sucessfully added",
        category: newCategory
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .put("/:id", async (req: Request, res: Response) => {
    try {
      const categoryToUpdate = {
        id: +req.params.id,
        ...req.body
      }
      const updatedCategory = await categoriesRepository.update(categoryToUpdate as any);
      res.status(201).json({
        status: "sucessfully updated",
        category: updatedCategory
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const deletedCategory = await categoriesRepository._delete(+req.params.id);
      res.status(204).json({
        status: "sucessfully deleted",
        category: deletedCategory
      });
    } catch (err: any) {
      defaultErrorHandler(err);
    }
  });

export default router;