import { OrderDataSource } from "../../interfaces/data-sources/mysql/order-data-source";
import { OrderDetailModel } from "./models/order-detail";
import { transection_db } from "../../../../config/database";
import { OkPacket, RowDataPacket } from "mysql2";
import { OrderListItemModel } from "./models/order-list-item";
import { OrderModel } from "./models/order";

export class OrderDataSourceImpl implements OrderDataSource {
	createNewOrder(order: OrderModel): Promise<number> {
		const sql =
			"INSERT INTO orders (no, restaurant_id, delivery_time, order_status_id) VALUES(?, ?, ?, ?)";

		return new Promise((resolve, reject) => {
			transection_db.query(
				sql,
				[
					order.order_no,
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

	getOrders(
		restaurants: Array<number>,
		status?: number
	): Promise<OrderListItemModel[]> {
		const sql =
			"SELECT id, restaurant_id, delivery_time, order_status_id, (SELECT COUNT(*) FROM order_details WHERE order_id=id) AS total FROM orders " +
			`WHERE ${
				status != undefined ? "order_status_id=?" : "order_status_id!=5"
			} ${restaurants.length > 0 ? "AND" : ""} ${restaurants
				.map((e) => "restaurant_id=" + e)
				.join(" OR ")} AND deleted_at IS NULL`;

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
	getOrderByOrderId(orderId: number): Promise<OrderModel | null> {
		const sql = "SELECT * FROM orders WHERE id=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			transection_db.query(sql, [orderId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}

				const data = <RowDataPacket>result;
				if (data.length > 0) {
					const order = new OrderModel(
						data[0].no,
						data[0].restaurant_id,
						data[0].order_status_id,
						data[0].delivery_time,
						data[0].created_at,
						data[0].id
					);

					resolve(order);
				} else {
					resolve(null);
				}
			});
		});
	}
	getOrderDetailByOrderId(orderId: number): Promise<OrderDetailModel[]> {
		const sql =
			"SELECT * FROM order_details WHERE order_id=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			transection_db.query(sql, [orderId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}

				const data = <RowDataPacket>result;

				const orderDetails: OrderDetailModel[] = data.map(
					(e: {
						id: number;
						order_id: number;
						price: number | null;
						product_id: number;
						amount: number;
					}) =>
						new OrderDetailModel(
							e.order_id,
							e.product_id,
							e.amount,
							e.price,
							e.id
						)
				);

				resolve(orderDetails);
			});
		});
	}
}
