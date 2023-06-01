import express from "express";
import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "../../domain/interfaces/use-cases/categories/get-all-categories";
import multer from "multer";
import { UploadCategoryImageUseCase } from "../../domain/interfaces/use-cases/categories/upload-category-image";
import { sendResponse } from "../../core/response/api-response";

export default function CategoriesRouter(
	getAllCategoriesUseCase: GetAllCategoriesUseCase,
	uploadCategoryImageUseCase: UploadCategoryImageUseCase
) {
	const router = express.Router();
	const upload = multer({
		storage: multer.diskStorage({}),
		limits: { fieldSize: 100000 },
	});

	router.get("/", async (req: Request, res: Response) => {
		try {
			const categories = await getAllCategoriesUseCase.execute();
			sendResponse(res, 200, categories);
		} catch (err) {
			sendResponse(res, 500, { message: "Error saving data" });
		}
	});

	router.post(
		"/upload-image/:id",
		upload.single("category_image"),
		async (req: Request, res: Response) => {
			try {
				if (req.file) {
					const image = await uploadCategoryImageUseCase.execute(
						req.file.path,
						"categories/"
					);
					//TODO handle add category image
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
