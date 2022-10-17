import express from "express";
import { Request, Response } from "express";
import { GetAllProductUseCase } from "../../domain/interfaces/use-cases/product/get-all-product";
import { GetAllProductsByCategoryIdUseCase } from "../../domain/interfaces/use-cases/product/get-all-products-by-category-id";


export default function ProductRouter(
	getAllProductUseCase: GetAllProductUseCase,
	getAllProductsByCategoryIdUseCase: GetAllProductsByCategoryIdUseCase
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

	router.get("/category/:id", async (req: Request, res: Response) => {
		try {
			const products = await getAllProductsByCategoryIdUseCase.execute(req.params.id);
			res.send(products);
		} catch (err) {
			res.status(500).send({ message: "Error fetching data" });
		}
	});

	return router;
}
