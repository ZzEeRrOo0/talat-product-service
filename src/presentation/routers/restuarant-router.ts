import express from "express";
import { Request, Response, NextFunction } from "express";
import { GetRestaurantDetailUseCase } from "../../domain/interfaces/use-cases/restaurant/get-retaurant-detail";
import { GetCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-customer";
import { GetRestaurantListUseCase } from "../../domain/interfaces/use-cases/restaurant/get-restaurant-list";
import { decrypt } from "../../core/util/authentication/decryption";
import { sendResponse } from "../../core/response/api-response";

export default function RestuarantRouter(
	getRestaurantList: GetRestaurantListUseCase,
	getResTaurantDetailUseCase: GetRestaurantDetailUseCase,
	getCustomerUseCase: GetCustomerUseCase
) {
	const router = express.Router();

	router.get(
		"/list",
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const userId = decrypt(req.headers["x-user-id"]!.toString());
				const customer = await getCustomerUseCase.execute(
					Number.parseInt(userId!)
				);

				if (customer != null) {
					const restaurants = await getRestaurantList.execute(
						customer.id!
					);
					sendResponse(res, 200, restaurants);
				} else {
					sendResponse(res, 404, {
						message: "User not found.",
					});
				}
			} catch (err) {
				sendResponse(res, 500, { message: "Error fetching data" });
			}
		}
	);

	router.get(
		"/detail",
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const userId = decrypt(req.headers["x-user-id"]!.toString());
				const userTypeId = decrypt(
					req.headers["x-user-type-id"]?.toString() ?? ""
				);
				const customer =
					userId ??
					(await getCustomerUseCase.execute(
						Number.parseInt(userId!)
					));

				if (customer != null || userTypeId == "1") {
					const restaurantId = req.query["restaurantId"];
					if (restaurantId != null && restaurantId != undefined) {
						const restaurantDetail =
							await getResTaurantDetailUseCase.execute(
								Number.parseInt(restaurantId.toString())
							);
						if (restaurantDetail != null) {
							sendResponse(res, 200, restaurantDetail);
						} else {
							sendResponse(res, 404, {
								message: "Not found.",
							});
						}
					} else {
						sendResponse(res, 400, {
							message: "Bad request.",
						});
					}
				} else {
					sendResponse(res, 404, {
						message: "User not found.",
					});
				}
			} catch (err) {
				console.log(err);
				sendResponse(res, 500, { message: "Error fetching data" });
			}
		}
	);

	return router;
}
