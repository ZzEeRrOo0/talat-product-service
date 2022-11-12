import express from "express";
import { Request, Response } from "express";
import { AddProductUseCase } from "../../domain/interfaces/use-cases/product/add-product";
import { GetAllProductUseCase } from "../../domain/interfaces/use-cases/product/get-all-product";
import { GetAllProductsByCategoryIdUseCase } from "../../domain/interfaces/use-cases/product/get-all-products-by-category-id";
import { GetAllProductsBySubCategoryIdUseCase } from "../../domain/interfaces/use-cases/product/get-all-products-by-sub-category-id";

export default function ProductRouter(
	getAllProductUseCase: GetAllProductUseCase,
	getAllProductsByCategoryIdUseCase: GetAllProductsByCategoryIdUseCase,
	getAllProductsBySubCategoryIdUseCase: GetAllProductsBySubCategoryIdUseCase,
	addProductUseCase: AddProductUseCase,
) {
	const router = express.Router();

	router.get("/", async (req: Request, res: Response) => {
		try {
			const currentPage = req.query["currentPage"]?.toString() ?? "1";
			const pageSize = req.query["pageSize"]?.toString() ?? "10";
			const products = await getAllProductUseCase.execute(
				Number.parseInt(currentPage),
				Number.parseInt(pageSize)
			);
			res.json({
				status: 200,
				data: products
			});
		} catch (err) {
			res.status(500).send({ message: "Error fetching data" });
		}
	});
	router.post('/', async (req: Request, res: Response) => {
		try {
			await addProductUseCase.execute(req.body)
			res.statusCode = 200
			res.json({ status: 200, message: "Created" })
		} catch (err) {
			res.status(500).send({ message: "Error saving data" })
		}
	})

	router.get("/category/:id", async (req: Request, res: Response) => {
		try {
			const products = await getAllProductsByCategoryIdUseCase.execute(
				req.params.id
			);
			res.send(products);
		} catch (err) {
			res.status(500).send({ message: "Error fetching data" });
		}
	});

	router.get("/sub-category/:id", async (req: Request, res: Response) => {
		try {
			const products = await getAllProductsBySubCategoryIdUseCase.execute(
				req.params.id
			);
			res.send(products);
		} catch (err) {
			res.status(500).send({ message: "Error fetching data" });
		}
	});

	return router;
}
