import express from "express";
import { Request, Response } from "express";
import { AddProductSizeUseCase } from "../../domain/interfaces/use-cases/product-size/add-product-size";
import { AddProductUseCase } from "../../domain/interfaces/use-cases/product/add-product";
import { GetAllProductUseCase } from "../../domain/interfaces/use-cases/product/get-all-product";
import { GetAllProductsByCategoryIdUseCase } from "../../domain/interfaces/use-cases/product/get-all-products-by-category-id";
import { GetAllProductsBySubCategoryIdUseCase } from "../../domain/interfaces/use-cases/product/get-all-products-by-sub-category-id";
import { APIResponse } from "../../core/response/api-response";
import multer from "multer";
import { UploadProductImageUseCase } from "../../domain/interfaces/use-cases/product/upload-product-image";
import { AddProductImageUseCase } from "../../domain/interfaces/use-cases/product/add-product-image";
import { ProductImage } from "../../domain/entities/product-image";
import { UpdateProductPriceUseCase } from "../../domain/interfaces/use-cases/product-size/update-product-price";
import { UpdateProductStatusUseCase } from "../../domain/interfaces/use-cases/product/update-product-statatus-usecase";
import { GetProductByProductIdUseCase } from "../../domain/interfaces/use-cases/product/get-by-product-id";

export default function ProductRouter(
	getAllProductUseCase: GetAllProductUseCase,
	getAllProductsByCategoryIdUseCase: GetAllProductsByCategoryIdUseCase,
	getAllProductsBySubCategoryIdUseCase: GetAllProductsBySubCategoryIdUseCase,
	addProductUseCase: AddProductUseCase,
	addProductSizeUseCase: AddProductSizeUseCase,
	uploadProductImageUseCase: UploadProductImageUseCase,
	addProductImageUseCase: AddProductImageUseCase,
	updateProductPriceUseCase: UpdateProductPriceUseCase,
	updateProductStatusUseCase: UpdateProductStatusUseCase,
	getProductByProductIdUseCase: GetProductByProductIdUseCase,
) {
	const router = express.Router();
	const upload = multer({
		storage: multer.diskStorage({}),
		limits: { fieldSize: 100000 },
	});

	router.get("/", async (req: Request, res: Response) => {
		try {
			const currentPage = req.query["currentPage"]?.toString() ?? "1";
			const pageSize = req.query["pageSize"]?.toString() ?? "5";
			const products = await getAllProductUseCase.execute(
				Number.parseInt(currentPage),
				Number.parseInt(pageSize),
				req
			);
			res.send(new APIResponse(200, products));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.get("/:id", async (req: Request, res: Response) => {
		try {
			const products = await getProductByProductIdUseCase.execute(
				req.params.id
			);
			res.send(new APIResponse(200, products));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.post("/", async (req: Request, res: Response) => {
		try {
			//TODO check body and haldle bad request
			const productID = await addProductUseCase.execute(req.body);
			await addProductSizeUseCase.execute({
				productId: productID,
				...req.body,
			});
			res.send(
				new APIResponse(200, {
					product_id: productID,
					message: "Created Successfully",
				})
			);
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

	router.put("/update-price/:id", async (req: Request, res: Response) => {
		try {
			let price = req.body.price ?? "0";
			if (price !== "0") {
				await updateProductPriceUseCase.execute(
					req.params.id,
					price as string
				);
				res.send(
					new APIResponse(200, {
						message: "update Product price successful",
					})
				);
			} else {
				res.send(new APIResponse(400, { message: "Error wrong data" }));
			}
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.put("/update-status/:id", async (req: Request, res: Response) => {
		try {
			let status = req.body.status ?? 0;
			if (status !== null) {
				await updateProductStatusUseCase.execute(
					req.params.id,
					status as number
				);
				res.send(
					new APIResponse(200, {
						message: "update Product status successful",
					})
				);
			} else {
				res.send(new APIResponse(400, { message: "Error wrong data" }));
			}
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.post(
		"/upload-image/:id",
		upload.single("product_image"),
		async (req: Request, res: Response) => {
			try {
				if (req.file) {
					const image = await uploadProductImageUseCase.execute(
						req.file.path,
						"products/"
					);
					const productImageId = await addProductImageUseCase.execute(
						new ProductImage(req.params.id, image)
					);
					res.send(
						new APIResponse(200, {
							message: "Image upload successful",
						})
					);
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
