import express from "express";
import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../../core/response/api-response";
import { GetUserByPhoneNumberAndPasswordFromUserDBUseCase } from "../../domain/interfaces/use-cases/users/get-user-by-phone-number-and-password-from-user-db";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";

export default function SignInRouter(
	getUserByPhoneNumberAndPasswordFromUserDBUseCase: GetUserByPhoneNumberAndPasswordFromUserDBUseCase,
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.post("/", async (req: Request, res: Response) => {
		try {
			const phone = req.body["phone"];
			const password = req.body["password"];
			if (phone && password) {
				const isExistUserPhoneNumber =
					await getUserByPhoneNumberAndPasswordFromUserDBUseCase.execute(
						phone,
						password
					);
				if (isExistUserPhoneNumber) {
					jsonWebTokenService
						.generateToken(phone)
						.then((userToken) => {
							res.send(new APIResponse(200, userToken));
						})
						.catch((err) => {
							res.send(
								new APIResponse(401, {
									message: "Unauthorized.",
								})
							);
						});
				} else {
					res.send(
						new APIResponse(404, {
							message: "User or password wrong",
						})
					);
				}
			} else {
				res.send(
					new APIResponse(400, {
						message: "Bad request.",
					})
				);
			}
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	return router;
}
