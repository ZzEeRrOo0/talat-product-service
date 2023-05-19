import express from "express";
import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../../core/response/api-response";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";

export default function RefreshTokenRouter(
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.post("/", verifyRefreshBody, async (req: Request, res: Response) => {
		try {
			await jsonWebTokenService
				.verifyRefreshToken(req.body["refresh_token"])
				.then((userToken) => {
					res.send(new APIResponse(200, userToken));
				})
				.catch((err) => {
					return res.status(401).json({ message: "Unauthorized" });	
				});
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	return router;
}

function verifyRefreshBody(req: Request, res: Response, next: NextFunction) {
	if (req.body["refresh_token"]) {
		next();
	} else {
		res.send(new APIResponse(400, { message: "Bad Request." }));
	}
}
