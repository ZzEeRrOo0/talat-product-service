import express from "express";
import { Request, Response } from "express";
import { GetAllProductUseCase } from "../../domain/interfaces/use-cases/product/get-all-product";

export default function ProductRouter(
	getAllProductUseCase: GetAllProductUseCase
) {
	const router = express.Router();

	router.get("/", async (req: Request, res: Response) => {
		try {
			const products = await getAllProductUseCase.execute();
			res.send(products);
		} catch (err) {
			res.status(500).send({ message: "Error fetching data" });
		}
	});

	return router;
}
