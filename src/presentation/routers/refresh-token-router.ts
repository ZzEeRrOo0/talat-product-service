import express from "express";
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { sendResponse } from "../../core/response/api-response";

export default function RefreshTokenRouter(
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.post("/", verifyRefreshBody, async (req: Request, res: Response) => {
		try {
			await jsonWebTokenService
				.verifyRefreshToken(req.body["refresh_token"])
				.then((userToken) => {
					sendResponse(res, 200, userToken);
				})
				.catch((err) => {
					sendResponse(res, 401, { message: "Unauthorized" });
				});
		} catch (err) {
			sendResponse(res, 500, { message: "Error fetching data" });
		}
	});

	return router;
}

function verifyRefreshBody(req: Request, res: Response, next: NextFunction) {
	if (req.body["refresh_token"]) {
		next();
	} else {
		sendResponse(res, 400, { message: "Bad Request." });
	}
}
