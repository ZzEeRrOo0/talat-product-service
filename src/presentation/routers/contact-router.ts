import express from "express";
import { Request, Response } from "express";
import { CreateContactUseCase } from "../../domain/interfaces/use-cases/contact/create-contact";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/contact/get-all-contact";
import { sendResponse } from "../../core/response/api-response";

export default function ContactsRouter(
	getAllContactsUseCase: GetAllContactsUseCase,
	createContactUseCase: CreateContactUseCase
) {
	const router = express.Router();

	router.get("/", async (req: Request, res: Response) => {
		try {
			const contacts = await getAllContactsUseCase.execute();
			sendResponse(res, 200, contacts);
		} catch (err) {
			sendResponse(res, 200, { message: "Error fetching data" });
		}
	});

	router.post("/", async (req: Request, res: Response) => {
		try {
			await createContactUseCase.execute(req.body);
			sendResponse(res, 201, { message: "Created" });
		} catch (err) {
			sendResponse(res, 200, { message: "Error saving data" });
		}
	});

	return router;
}
