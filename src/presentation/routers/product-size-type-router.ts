import express from "express";
import { Request, Response } from "express";
import { GetAllProductSizeTypeUseCase } from "../../domain/interfaces/use-cases/product-size-type/get-by-sub-category-usecase";
import { APIResponse } from '../../core/response/api-response';

export default function ProductSizeTypeRouter(
    getAllProductSizeTypeUseCase: GetAllProductSizeTypeUseCase
) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        try {
            const productSizeType = await getAllProductSizeTypeUseCase.execute();
            res.send(new APIResponse(200, productSizeType))
        } catch (err) {
            res.send(new APIResponse(500, { message: "Error fetching data" }))
        }
    });

    return router;
}
