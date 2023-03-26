import express, { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";

export default function OrderRouter() {
	const router = express.Router();

	router.post("/new", (req: Request, res: Response) => {
		res.send(new APIResponse(200, { message: "success." }));
	});

	return router;
}
