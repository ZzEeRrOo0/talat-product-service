import express from "express";
import { Request, Response } from "express";
import { GetAllBySubCategoryIdUseCase } from "../../domain/interfaces/use-cases/product-type/get-all-by-sub-category-id";


export default function ProductTypeRouter(
    getAllBySubCategoryIdUseCase: GetAllBySubCategoryIdUseCase
) {
    const router = express.Router();

    router.get("/:subCategoryId", async (req: Request, res: Response) => {
        try {
            const productType = await getAllBySubCategoryIdUseCase.execute(req.params.subCategoryId);
            res.json({
                status: 200,
                data: productType
            });
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });

    return router;
}