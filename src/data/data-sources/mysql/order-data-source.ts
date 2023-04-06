import { OrderDataSource } from "../../interfaces/data-sources/mysql/order-data-source";
import { OrderDetailModel } from "./models/order-detail";
import { transection_db } from "../../../../config/database";
import { OkPacket } from "mysql2";

export class OrderDataSourceImpl implements OrderDataSource {
	createNewOrder(restaurantId: number): Promise<number> {
		const sql = "INSERT INTO orders (restaurant_id) VALUES(?)";

		return new Promise((resolve, reject) => {
			transection_db.query(sql, [restaurantId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}

				const insertId = (<OkPacket>result).insertId;
				resolve(insertId);
			});
		});
	}
	addOrderDetail(orderDetail: OrderDetailModel): Promise<number> {
		const sql =
			"INSERT INTO order_details (order_id, product_id, amount, delivery_time, order_status_id) VALUES(?, ?, ?, ?, ?)";

		return new Promise((resolve, reject) => {
			transection_db.query(
				sql,
				[
					orderDetail.order_id,
					orderDetail.product_id,
					orderDetail.amount,
					orderDetail.delivery_time,
					orderDetail.order_status_id,
				],
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
}
