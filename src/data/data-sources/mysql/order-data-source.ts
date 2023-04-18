import { OrderDataSource } from "../../interfaces/data-sources/mysql/order-data-source";
import { OrderDetailModel } from "./models/order-detail";
import { transection_db } from "../../../../config/database";
import { OkPacket, RowDataPacket } from "mysql2";
import { OrderListItemModel } from "./models/order-list-item";
import { OrderModel } from "./models/order";

export class OrderDataSourceImpl implements OrderDataSource {
	createNewOrder(order: OrderModel): Promise<number> {
		const sql =
			"INSERT INTO orders (restaurant_id, delivery_time, order_status_id) VALUES(?, ?, ?)";

		return new Promise((resolve, reject) => {
			transection_db.query(
				sql,
				[
					order.restaurant_id,
					order.delivery_time,
					order.order_status_id,
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
	addOrderDetail(orderDetail: OrderDetailModel): Promise<number> {
		const sql =
			"INSERT INTO order_details (order_id, product_id, amount) VALUES(?, ?, ?)";

		return new Promise((resolve, reject) => {
			transection_db.query(
				sql,
				[
					orderDetail.order_id,
					orderDetail.product_id,
					orderDetail.amount,
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

	getOrders(status?: number): Promise<OrderListItemModel[]> {
		const sql =
			"SELECT id, restaurant_id, delivery_time, order_status_id, (SELECT COUNT(*) FROM order_details WHERE order_id=id) AS total FROM orders " +
			`WHERE ${
				status != undefined ? "order_status_id=?" : "order_status_id!=4"
			} AND deleted_at IS NULL`;

		return new Promise((resolve, reject) => {
			transection_db.query(
				sql,
				status != undefined ? [status] : [],
				(error, result) => {
					if (error) {
						// throw new Error("Internal server error.");
						console.log(error);
					}

					const data = <RowDataPacket>result;
					const orders: OrderListItemModel[] = data.map(
						(e: {
							id: number;
							restaurant_id: number;
							delivery_time: Date;
							order_status_id: number;
							total: number;
						}) =>
							new OrderListItemModel(
								e.id,
								e.restaurant_id,
								e.delivery_time,
								e.order_status_id,
								e.total
							)
					);

					resolve(orders);
				}
			);
		});
	}
}
