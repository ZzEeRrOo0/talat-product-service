import express from "express";
import { Request, Response } from "express";
import { GetAllByCategoryIdUseCase } from "../../domain/interfaces/use-cases/sub-category/get-all-by-category-id";
import { UploadSubCategoryImageUseCase } from "../../domain/interfaces/use-cases/sub-category/upload-image";
import multer from "multer";
import { ProductImage } from "../../domain/entities/product-image";
import { AddSubCategoryImageUseCase } from "../../domain/interfaces/use-cases/sub-category/add-sub-category-image";
import { sendResponse } from "../../core/response/api-response";

export default function SubCategoryRouter(
	getAllByCategoryIdUseCase: GetAllByCategoryIdUseCase,
	uploadSubCategoryImageUseCase: UploadSubCategoryImageUseCase,
	addSubCategoryImageUseCase: AddSubCategoryImageUseCase
) {
	const router = express.Router();
	const upload = multer({
		storage: multer.diskStorage({}),
		limits: { fieldSize: 100000 },
	});

	router.get("/:categoryId", async (req: Request, res: Response) => {
		try {
			const subCategory = await getAllByCategoryIdUseCase.execute(
				req.params.categoryId
			);
			sendResponse(res, 200, subCategory);
		} catch (err) {
			sendResponse(res, 500, { message: "Error fetching data" });
		}
	});

	router.post(
		"/upload-image/:id",
		upload.single("sub_category_image"),
		async (req: Request, res: Response) => {
			try {
				if (req.file) {
					const image = await uploadSubCategoryImageUseCase.execute(
						req.file.path,
						"sub-category/"
					);
					const subCategoryImageId =
						await addSubCategoryImageUseCase.execute(
							new ProductImage(req.params.id, image)
						);
					sendResponse(res, 200, {
						message: "Image upload successful",
					});
				} else {
					sendResponse(res, 400, { message: "Bad request" });
				}
			} catch (err) {
				sendResponse(res, 500, { message: "Upload failure" });
			}
		}
	);

	return router;
}
