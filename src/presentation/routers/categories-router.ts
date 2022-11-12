import express from "express";
import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "../../domain/interfaces/use-cases/categories/get-all-categories";
import { APIResponse } from '../../core/response/api-response';

export default function CategoriesRouter(
    getAllCategoriesUseCase: GetAllCategoriesUseCase
) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        try {
            const categories = await getAllCategoriesUseCase.execute();
            res.send(new APIResponse(200, categories))
        } catch (err) {
            res.send(new APIResponse(500, { message: "Error saving data" }))
        }
    });

    return router;
}
