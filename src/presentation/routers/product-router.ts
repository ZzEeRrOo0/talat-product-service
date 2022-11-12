import express from "express";
import { Request, Response } from "express";
import { AddProductUseCase } from "../../domain/interfaces/use-cases/product/add-product";
import { GetAllProductUseCase } from "../../domain/interfaces/use-cases/product/get-all-product";
import { GetAllProductsByCategoryIdUseCase } from "../../domain/interfaces/use-cases/product/get-all-products-by-category-id";
import { GetAllProductsBySubCategoryIdUseCase } from "../../domain/interfaces/use-cases/product/get-all-products-by-sub-category-id";
import { APIResponse } from "../../core/response/api-response";
import multer from "multer";
import { UploadProductImageUseCase } from "../../domain/interfaces/use-cases/product/upload-product-image";

export default function ProductRouter(
	getAllProductUseCase: GetAllProductUseCase,
	getAllProductsByCategoryIdUseCase: GetAllProductsByCategoryIdUseCase,
	getAllProductsBySubCategoryIdUseCase: GetAllProductsBySubCategoryIdUseCase,
	addProductUseCase: AddProductUseCase,
	uploadProductImageUseCase: UploadProductImageUseCase
) {
	const router = express.Router();
	const upload = multer();

	router.get("/", async (req: Request, res: Response) => {
		try {
			const currentPage = req.query["currentPage"]?.toString() ?? "1";
			const pageSize = req.query["pageSize"]?.toString() ?? "10";
			const products = await getAllProductUseCase.execute(
				Number.parseInt(currentPage),
				Number.parseInt(pageSize)
			);
			res.send(new APIResponse(200, products));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});
	router.post("/", async (req: Request, res: Response) => {
		try {
			//TODO check body and haldle bad request
			await addProductUseCase.execute(req.body);
			res.send(new APIResponse(200, { message: "Created Successfully" }));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error saving data" }));
		}
	});

	router.get("/category/:id", async (req: Request, res: Response) => {
		try {
			const products = await getAllProductsByCategoryIdUseCase.execute(
				req.params.id
			);
			res.send(new APIResponse(200, products));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.get("/sub-category/:id", async (req: Request, res: Response) => {
		try {
			const products = await getAllProductsBySubCategoryIdUseCase.execute(
				req.params.id
			);
			res.send(new APIResponse(200, products));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.post(
		"/upload-image",
		upload.single("product_image"),
		async (req: Request, res: Response) => {
			try {
				if (req.file) {
					const image = await uploadProductImageUseCase.execute(
						req.file,
						"product"
					);
					console.log(image);
					//TODO insert image name to product image table
				} else {
					res.send(new APIResponse(400, { message: "Bad request" }));
				}
			} catch (err) {
				res.send(new APIResponse(500, { message: "Upload failure" }));
			}
		}
	);

	return router;
}
