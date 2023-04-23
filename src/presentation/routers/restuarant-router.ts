import express from "express";
import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../../core/response/api-response";
import { GetRestaurantDetailUseCase } from "../../domain/interfaces/use-cases/restaurant/get-retaurant-detail";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { GetCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-customer";
import { AuthenticationService } from "../../core/util/authentication/index";
import { GetRestaurantListUseCase } from "../../domain/interfaces/use-cases/restaurant/get-restaurant-list";

export default function RestuarantRouter(
	getRestaurantList: GetRestaurantListUseCase,
	getResTaurantDetailUseCase: GetRestaurantDetailUseCase,
	getCustomerUseCase: GetCustomerUseCase,
	authenticationService: AuthenticationService,
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.get(
		"/list",
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const isLogedIn = await jsonWebTokenService.verifyAccessToken(
					req
				);
				const isCorrectHeaders =
					authenticationService.checkHeaders(req);
				if (isLogedIn && isCorrectHeaders) {
					const userId = req.headers["user-id"]?.toString();
					const customer = await getCustomerUseCase.execute(
						Number.parseInt(userId!)
					);

					if (customer != null) {
						const restaurants = await getRestaurantList.execute(
							customer.id!
						);
						res.send(new APIResponse(200, restaurants));
					} else {
						res.send(
							new APIResponse(404, {
								message: "User not found.",
							})
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

	router.get(
		"/detail",
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const isLogedIn = await jsonWebTokenService.verifyAccessToken(
					req
				);
				const isCorrectHeaders =
					authenticationService.checkHeaders(req);
				if (isLogedIn && isCorrectHeaders) {
					const userId = req.headers["user-id"]?.toString();
					const customer = await getCustomerUseCase.execute(
						Number.parseInt(userId!)
					);

					if (customer != null) {
						const restaurantId = req.query["restaurantId"];
						if (restaurantId != null && restaurantId != undefined) {
							const restaurantDetail =
								await getResTaurantDetailUseCase.execute(
									Number.parseInt(restaurantId.toString())
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
								new APIResponse(400, {
									message: "Bad request.",
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
