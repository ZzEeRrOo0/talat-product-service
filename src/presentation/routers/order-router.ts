import express, { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { CreateNewOrderUseCase } from "../../domain/interfaces/use-cases/order/create-new-order";
import { AddOrderDetailUseCase } from "../../domain/interfaces/use-cases/order/add-order-detail";
import { AuthenticationService } from "../../core/util/authentication/index";
import { OrderDetail } from "../../domain/entities/order-detail";
import { OrderProductItem } from "../../domain/entities/order-product-item";
import { GetOrderListUseCase } from "../../domain/interfaces/use-cases/order/get-order-list";
import { Order } from "../../domain/entities/order";

export default function OrderRouter(
	createNewOrderUseCase: CreateNewOrderUseCase,
	addOrderDetailUseCase: AddOrderDetailUseCase,
	getOrderListUseCase: GetOrderListUseCase,
	authenticationService: AuthenticationService,
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.get("/list", async (req: Request, res: Response) => {
		try {
			const isLogedIn = await jsonWebTokenService.verifyAccessToken(req);
			const isCorrectHeaders = authenticationService.checkHeaders(req);
			if (isLogedIn && isCorrectHeaders) {
				const orders = await getOrderListUseCase.execute();
				res.send(new APIResponse(200, orders));
			} else {
				res.send(new APIResponse(400, { message: "Unauthorize." }));
			}
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error saving data" }));
		}
	});

	router.post("/new", async (req: Request, res: Response) => {
		try {
			const isLogedIn = await jsonWebTokenService.verifyAccessToken(req);
			const isCorrectHeaders = authenticationService.checkHeaders(req);
			if (isLogedIn && isCorrectHeaders) {
				if (verifyOrderRequest(req)) {
					const order = new Order(
						req.body["restaurant_id"],
						req.body["delivery_time"],
						1
					);
					const orderId = await createNewOrderUseCase.execute(order);

					const orderProducts = req.body[
						"order_products"
					] as Array<OrderProductItem>;

					orderProducts.map(async (e) => {
						const orderDetail = new OrderDetail(
							orderId,
							e.product_id,
							e.amount
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
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error saving data" }));
		}
	});

	return router;
}

function verifyOrderRequest(req: Request): boolean {
	const keys = ["restaurant_id", "order_products", "delivery_time"];

	if (keys.every((e) => e in req.body)) {
		return Array.isArray(req.body["order_products"]);
	}

	return false;
}
