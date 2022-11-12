import express from "express";
import { Request, Response } from "express";
import { GetAllByCategoryIdUseCase } from "../../domain/interfaces/use-cases/sub-category/get-all-by-category-id";
import { APIResponse } from '../../core/response/api-response';

export default function SubCategoryRouter(
    getAllByCategoryIdUseCase: GetAllByCategoryIdUseCase
) {
    const router = express.Router();

    router.get("/:categoryId", async (req: Request, res: Response) => {
        try {
            const subCategory = await getAllByCategoryIdUseCase.execute(req.params.categoryId);
            res.send(new APIResponse(200, subCategory))
        } catch (err) {
            res.send(new APIResponse(500, { message: "Error fetching data" }))
        }
    });

    return router;
}