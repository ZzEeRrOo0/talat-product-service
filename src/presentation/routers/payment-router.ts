import express, { Request, Response } from "express";
import { decrypt } from "../../core/util/authentication/decryption";
import { AddOrderPaymentUseCase } from "../../domain/interfaces/use-cases/payment/add-order-payment";
import { GetOrderPaymentUseCase } from "../../domain/interfaces/use-cases/payment/get-order-payment";
import { UpdateOrderPaymentStatusUseCase } from "../../domain/interfaces/use-cases/payment/update-order-payment-status";
import { sendResponse } from "../../core/response/api-response";

export default function PaymentRouter(
	addOrderPaymentUseCase: AddOrderPaymentUseCase,
	getOrderPaymentUseCase: GetOrderPaymentUseCase,
	updateOrderPaymentStatusUseCase: UpdateOrderPaymentStatusUseCase
) {
	const router = express.Router();

	router.post("/new", async (req: Request, res: Response) => {
		try {
			const userTypeId = decrypt(
				req.headers["x-user-type-id"]?.toString() ?? ""
			);
			if (userTypeId == "1") {
				if (verifyOrderPaymentRequest(req)) {
					const { order_id, total_price, payment_type_id, payment_status_id } = req.body;
					await addOrderPaymentUseCase.execute(
						order_id,
						total_price,
						payment_type_id,
						payment_status_id
					);
					sendResponse(res, 200, { messge: "success." });
				} else {
					sendResponse(res, 400, { message: "Bad request" });
				}
			} else {
				sendResponse(res, 400, { messge: "Bad Request" });
			}
		} catch (err) {
			sendResponse(res, 500, { message: "Error saving data" });
		}
	});

	router.get("/order-id/:id", async (req: Request, res: Response) => {
		try {
			const orderId = Number.parseInt(req.params.id);
			const orderPayment = await getOrderPaymentUseCase.execute(orderId);
			if (orderPayment) {
				sendResponse(res, 200, orderPayment);
			} else {
				sendResponse(res, 404, { messge: "Not found." });
			}
		} catch (err) {
			sendResponse(res, 500, { message: "Error fetching data" });
		}
	});

	router.post("/update-status", async (req: Request, res: Response) => {
		try {
			const userTypeId = decrypt(
				req.headers["x-user-type-id"]?.toString() ?? ""
			);
			const orderId = req.body["order_id"];
			const status = req.body["status"];
			const paymentTypeId = req.body["payment_type_id"];
			const total = req.body["total"];
			if (
				userTypeId == "1" &&
				orderId &&
				status &&
				paymentTypeId &&
				total
			) {
				const order = await getOrderPaymentUseCase.execute(orderId);
				if (order) {
					await updateOrderPaymentStatusUseCase.execute(
						status,
						orderId,
						paymentTypeId,
						total
					);
					sendResponse(res, 200, { message: "Success." });
				} else {
					sendResponse(res, 400, { message: "Bad Request." });
				}
			} else {
				sendResponse(res, 400, { message: "Bad Request." });
			}
		} catch (err) {
			sendResponse(res, 500, { message: "Error saving data" });
		}
	});

	return router;
}

function verifyOrderPaymentRequest(req: Request): boolean {
	const fields = [
		"order_id",
		"total_price",
		"payment_type_id",
		"payment_status_id",
	];

	return fields.every(
		(field) =>
			req.body[field] !== undefined &&
			req.body[field] !== null &&
			req.body[field] !== ""
	);
}
