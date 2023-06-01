import express from "express";
import { Request, Response } from "express";
import { GetAllBySubCategoryIdUseCase } from "../../domain/interfaces/use-cases/product-type/get-all-by-sub-category-id";
import { sendResponse } from "../../core/response/api-response";

export default function ProductTypeRouter(
	getAllBySubCategoryIdUseCase: GetAllBySubCategoryIdUseCase
) {
	const router = express.Router();

	router.get("/:subCategoryId", async (req: Request, res: Response) => {
		try {
			const productType = await getAllBySubCategoryIdUseCase.execute(
				req.params.subCategoryId
			);
			sendResponse(res, 200, productType);
		} catch (err) {
			sendResponse(res, 500, { message: "Error fetching data" });
		}
	});

	return router;
}
