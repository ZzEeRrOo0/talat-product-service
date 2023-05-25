import express, { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { CreateNewOrderUseCase } from "../../domain/interfaces/use-cases/order/create-new-order";
import { AddOrderDetailUseCase } from "../../domain/interfaces/use-cases/order/add-order-detail";
import { OrderDetail } from "../../domain/entities/order-detail";
import { OrderProductItem } from "../../domain/entities/order-product-item";
import { GetOrderListUseCase } from "../../domain/interfaces/use-cases/order/get-order-list";
import { Order } from "../../domain/entities/order";
import { GetOrderDetailsUseCase } from "../../domain/interfaces/use-cases/order/get-order-detail";
import { GetOrderUseCase } from "../../domain/interfaces/use-cases/order/get-order";
import { GetProductByProductIdUseCase } from "../../domain/interfaces/use-cases/product/get-by-product-id";
import { GetAllOrderUseCase } from "../../domain/interfaces/use-cases/order/get-all-order";
import { UpdateOrderStatusUseCase } from "../../domain/interfaces/use-cases/order/update-order-status";
import {
	OrderDetailResponse,
	ProductItemDetail,
} from "../../domain/entities/order-detail-response";

export default function OrderRouter(
	createNewOrderUseCase: CreateNewOrderUseCase,
	addOrderDetailUseCase: AddOrderDetailUseCase,
	getAllOrderUseCase: GetAllOrderUseCase,
	getOrderListUseCase: GetOrderListUseCase,
	getOrderUseCase: GetOrderUseCase,
	getOrderDetailsUseCase: GetOrderDetailsUseCase,
	getProductByProductIdUseCase: GetProductByProductIdUseCase,
	updateOrderStatusUseCase: UpdateOrderStatusUseCase
) {
	const router = express.Router();

	router.get("/all", async (req: Request, res: Response) => {
		try {
			const currentPage = req.query["currentPage"]?.toString() ?? "1";
			const pageSize = req.query["pageSize"]?.toString() ?? "10";
			const orders = await getAllOrderUseCase.execute(
				Number.parseInt(currentPage),
				Number.parseInt(pageSize),
				req
			);
			res.send(new APIResponse(200, orders));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.get("/list", async (req: Request, res: Response) => {
		try {
			const status = req.query["status"]
				? Number.parseInt(req.query["status"].toString())
				: undefined;
			const restaurants = req.query["restaurants"]
				? (req.query["restaurants"] as Array<string>)
				: [];
			const restaurantsValue = restaurants.map((e) => Number.parseInt(e));
			if (restaurantsValue.length < 1) {
				res.send(new APIResponse(400, { message: "Bad request." }));
			} else {
				const orders = await getOrderListUseCase.execute(
					restaurantsValue,
					status
				);
				res.send(new APIResponse(200, orders));
			}
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error saving data" }));
		}
	});

	router.get("/details/:id", async (req: Request, res: Response) => {
		try {
			const orderId = req.params.id;
			if (orderId == null || orderId == undefined) {
				res.send(new APIResponse(400, { message: "Bad Request." }));
			} else {
				const order = await getOrderUseCase.execute(
					Number.parseInt(orderId)
				);
				if (order != null) {
					const orderDetails = await getOrderDetailsUseCase.execute(
						Number.parseInt(orderId)
					);

					const productItems = await Promise.all(
						orderDetails.map(
							async (e): Promise<ProductItemDetail> => {
								const productDetail =
									await getProductByProductIdUseCase.execute(
										e.product_id!.toString()
									);
								return new ProductItemDetail(
									e.product_id!,
									productDetail[0].name,
									Number.parseFloat(e.amount.toString()),
									Number.parseInt(e.price?.toString() ?? "0"),
									productDetail[0].productSizeType ?? "",
									productDetail[0].image ?? ''
								);
							}
						)
					);
					const orderDetail = new OrderDetailResponse(
						order.id!,
						order.order_no,
						order.restaurant_id,
						order.order_status_id,
						order.order_time!,
						order.delivery_time,
						productItems
					);
					res.send(new APIResponse(200, orderDetail));
				} else {
					res.send(new APIResponse(404, { message: "Not found." }));
				}
			}
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetch data" }));
		}
	});

	router.post("/new", async (req: Request, res: Response) => {
		try {
			if (verifyOrderRequest(req)) {
				const orderNo = generateOrderNumber();
				const order = new Order(
					orderNo,
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
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error saving data" }));
		}
	});

	router.post("/update-status", async (req: Request, res: Response) => {
		try {
			const orderId = req.body["order_id"];
			const status = req.body["status"];
			if (orderId && status) {
				const order = await getOrderUseCase.execute(orderId);
				if (order) {
					await updateOrderStatusUseCase.execute(orderId, status);
					res.send(new APIResponse(200, { message: "Success." }));
				} else {
					res.send(new APIResponse(400, { message: "Bad Request." }));
				}
			} else {
				res.send(new APIResponse(400, { message: "Bad Request." }));
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

function generateOrderNumber(): string {
	const timestamp = Date.now().toString().slice(-6); // get last 6 digits of current timestamp
	const random = Math.floor(Math.random() * 100)
		.toString()
		.padStart(2, "0"); // generate a 2-digit random number and pad it with leading zeros if necessary
	const orderNumber = `${timestamp}${random}`; // concatenate timestamp and random number
	return orderNumber;
}
