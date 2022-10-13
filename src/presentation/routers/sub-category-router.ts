import express from "express";
import { Request, Response } from "express";
import { GetAllByCategoryIdUseCase } from "../../domain/interfaces/use-cases/sub-category/get-all-by-category-id";

export default function SubCategoryRouter(
    getAllByCategoryIdUseCase: GetAllByCategoryIdUseCase
) {
    const router = express.Router();

    router.get("/:categoryId", async (req: Request, res: Response) => {
        try {
            const subCategory = await getAllByCategoryIdUseCase.execute(req.params.categoryId);
            res.send(subCategory);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });

    return router;
}