import express from "express";
import { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { GetListFilterProductUseCase } from "../../domain/interfaces/use-cases/product/get-list-filter-product";

export default function SearchRouter(
	getListFilterProductUseCase: GetListFilterProductUseCase
) {
	const router = express.Router();

	router.get("/filter-product-name", async (req: Request, res: Response) => {
		try {
			const name = req.query["name"]?.toString() ?? "";
			const data = await getListFilterProductUseCase.execute(name);
			res.send(new APIResponse(200, data));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	return router;
}
