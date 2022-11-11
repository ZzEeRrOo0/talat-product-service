import express from "express";
import { Request, Response } from "express";
import { GetAllProductSizeTypeUseCase } from "../../domain/interfaces/use-cases/product-size-type/get-by-sub-category-usecase";

export default function ProductSizeTypeRouter(
    getAllProductSizeTypeUseCase: GetAllProductSizeTypeUseCase
) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        try {
            const productSizeType = await getAllProductSizeTypeUseCase.execute();
            res.json({
                status: 200,
                data: productSizeType
            });
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });

    return router;
}
