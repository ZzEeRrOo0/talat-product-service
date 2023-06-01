import express from "express";
import { Request, Response } from "express";
import { GetListFilterProductUseCase } from "../../domain/interfaces/use-cases/product/get-list-filter-product";
import { sendResponse } from "../../core/response/api-response";

export default function SearchRouter(
	getListFilterProductUseCase: GetListFilterProductUseCase
) {
	const router = express.Router();

	router.get("/filter-product-name", async (req: Request, res: Response) => {
		try {
			const name = req.query["name"]?.toString() ?? "";
			if (name != "") {
				const data = await getListFilterProductUseCase.execute(name);
				sendResponse(res, 200, data);
			} else {
				sendResponse(res, 200, []);
			}
		} catch (err) {
			sendResponse(res, 500, { message: "Error fetching data" });
		}
	});

	return router;
}
