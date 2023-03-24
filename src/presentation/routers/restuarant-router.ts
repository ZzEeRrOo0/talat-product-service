import express from "express";
import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../../core/response/api-response";
import { GetRestaurantDetailUseCase } from "../../domain/interfaces/use-cases/restaurant/get-retaurant-detail";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { GetCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-customer";

export default function RestuarantRouter(
	getResTaurantDetailUseCase: GetRestaurantDetailUseCase,
	getCustomerUseCase: GetCustomerUseCase,
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.get(
		"/detail",
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const isLogedIn = await jsonWebTokenService.verifyAccessToken(
					req
				);
				if (isLogedIn) {
					const userId = req.headers["user-id"]?.toString();
					if (userId != null) {
						const customer = await getCustomerUseCase.execute(
							Number.parseInt(userId)
						);
						if (customer != null) {
							const restaurantDetail =
								await getResTaurantDetailUseCase.execute(
									customer.id!
								);
							if (restaurantDetail != null) {
								res.send(
									new APIResponse(200, restaurantDetail)
								);
							} else {
								res.send(
									new APIResponse(404, {
										message: "Not found.",
									})
								);
							}
						} else {
							res.send(
								new APIResponse(404, {
									message: "User not found.",
								})
							);
						}
					} else {
						res.send(
							new APIResponse(400, { message: "Bad Request." })
						);
					}
				} else {
					res.send(new APIResponse(400, { message: "Unauthorize." }));
				}
			} catch (err) {
				res.send(
					new APIResponse(500, { message: "Error fetching data" })
				);
			}
		}
	);

	return router;
}
