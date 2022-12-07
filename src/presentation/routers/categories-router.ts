import express from "express";
import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "../../domain/interfaces/use-cases/categories/get-all-categories";
import { APIResponse } from "../../core/response/api-response";
import multer from "multer";
import { UploadCategoryImageUseCase } from "../../domain/interfaces/use-cases/categories/upload-category-image";

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
			res.send(new APIResponse(200, categories));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error saving data" }));
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
