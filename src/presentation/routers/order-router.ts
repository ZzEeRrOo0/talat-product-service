import express, { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { CreateNewOrderUseCase } from "../../domain/interfaces/use-cases/order/create-new-order";
import { AddOrderDetailUseCase } from "../../domain/interfaces/use-cases/order/add-order-detail";
import { AuthenticationService } from "../../core/util/authentication/index";
import { OrderDetail } from "../../domain/entities/order-detail";
import { OrderProductItem } from "../../domain/entities/order-product-item";

export default function OrderRouter(
	createNewOrderUseCase: CreateNewOrderUseCase,
	addOrderDetailUseCase: AddOrderDetailUseCase,
	authenticationService: AuthenticationService,
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.post("/new", async (req: Request, res: Response) => {
		const isLogedIn = await jsonWebTokenService.verifyAccessToken(req);
		const isCorrectHeaders = authenticationService.checkHeaders(req);
		if (isLogedIn && isCorrectHeaders) {
			if (verifyOrderRequest(req)) {
				const orderId = await createNewOrderUseCase.execute(
					req.body["restaurant_id"]
				);

				const orderProducts = req.body[
					"order_products"
				] as Array<OrderProductItem>;

				orderProducts.map(async (e) => {
					const orderDetail = new OrderDetail(
						orderId,
						e.product_id,
						e.amount,
						req.body["order_time"],
						req.body["delivery_time"],
						1
					);

					await addOrderDetailUseCase.execute(orderDetail);
				});

				res.send(new APIResponse(200, { message: "Success." }));
			} else {
				res.send(new APIResponse(400, { message: "Bad Request." }));
			}
		} else {
			res.send(new APIResponse(400, { message: "Unauthorize." }));
		}
	});

	return router;
}

function verifyOrderRequest(req: Request): boolean {
	const keys = [
		"restaurant_id",
		"order_products",
		"order_time",
		"delivery_time",
	];

	if (keys.every((e) => e in req.body)) {
		return Array.isArray(req.body["order_products"]);
	}

	return false;
}
