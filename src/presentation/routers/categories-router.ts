import express from "express";
import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "../../domain/interfaces/use-cases/categories/get-all-categories";

export default function CategoriesRouter(
    getAllCategoriesUseCase: GetAllCategoriesUseCase
) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        try {
            const categories = await getAllCategoriesUseCase.execute();
            res.json({
                status: 200,
                data: categories
            });
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });

    return router;
}
