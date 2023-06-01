import { PaymentDataSource } from "../../interfaces/data-sources/mysql/payment-data-source";
import { payment_db } from "../../../../config/database";
import { OkPacket, RowDataPacket } from "mysql2";
import { OrderPayment } from "../../../domain/entities/order-payment";
import { OrderPaymentModel } from "./models/order-payment";

export class PaymentDataSourceImlp implements PaymentDataSource {
	createNewOrderPayment(
		orderId: number,
		total: number,
		paymentTypeId: number
	): Promise<number> {
		const sql =
			"INSERT INTO order_payments (order_id, total_price, payment_type_id, payment_status_id) VALUES(?, ?, ?, 1)";

		return new Promise((resolve, reject) => {
			payment_db.query(
				sql,
				[orderId, total, paymentTypeId],
				(error, result) => {
					if (error) {
						// throw new Error("Internal server error.");
						console.log(error);
					}

					const insertId = (<OkPacket>result).insertId;
					resolve(insertId);
				}
			);
		});
	}

	getOrderPaymentByOrderId(orderId: number): Promise<OrderPayment | null> {
		const sql =
			"SELECT * FROM order_payments WHERE id=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			payment_db.query(sql, [orderId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}

				const data = <RowDataPacket>result;
				if (data.length > 0) {
					const order = new OrderPaymentModel(
						data[0].order_id,
						data[0].total_price,
						data[0].payment_type_id,
						data[0].payment_status_id
					);

					resolve(order);
				} else {
					resolve(null);
				}
			});
		});
	}

	updateOrderPaymentStatus(
		status: number,
		orderId: number,
		paymentTypeId: number,
		total: number
	): Promise<boolean> {
		const sql =
			"UPDATE order_payments SET total_price=?, payment_type_id=?, payment_status_id=? WHERE order_id=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			payment_db.query(
				sql,
				[total, paymentTypeId, status, orderId],
				(error, result) => {
					if (error) {
						console.log(error);
						throw new Error("Internal server error.");
					}

					const data = <OkPacket>result;

					if (data.affectedRows === 1) {
						resolve(true);
					}

					resolve(false);
				}
			);
		});
	}
}
