import { promisify } from "util";
import { Request } from "express";
import { OrderDataSource } from "../../interfaces/data-sources/mysql/order-data-source";
import { OrderDetailModel } from "./models/order-detail";
import { transection_db } from "../../../../config/database";
import { OkPacket, RowDataPacket } from "mysql2";
import { OrderListItemModel } from "./models/order-list-item";
import { OrderModel } from "./models/order";
import { AllOrderModel } from "./models/all-order";
import { Pagination } from "../../../core/pagination";
import { OrderDetail } from "../../../domain/entities/order-detail";

export class OrderDataSourceImpl implements OrderDataSource {
	paginationService: Pagination;

	constructor($paginationService: Pagination) {
		this.paginationService = $paginationService;
	}

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

	getAllOrder(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllOrderModel> {
		const getTotalItemSql = req.query.orderNo
			? `SELECT COUNT(*) AS total FROM orders WHERE no=${req.query.orderNo} AND deleted_at IS NULL`
			: `SELECT COUNT(*) AS total FROM orders WHERE ${
					req.query.status != undefined ? "order_status_id=? AND" : ""
			  } deleted_at IS NULL`;

		const getOrdersSql = `SELECT id, no, restaurant_id, delivery_time, order_status_id, created_at, (SELECT COUNT(*) FROM order_details WHERE order_id=orders.id) AS total FROM orders WHERE ${
			req.query.orderNo ? "no=? AND" : ""
		}${
			req.query.status ? "order_status_id=? AND" : ""
		} deleted_at IS NULL ORDER BY created_at DESC LIMIT ? OFFSET ?`;

		return new Promise((resolve, reject) => {
			transection_db.query(
				getTotalItemSql,
				req.query.status ? [req.query.status] : [],
				(error, result) => {
					if (error) {
						console.log(error);
						throw new Error("Internal server error.");
					}

					const data = <RowDataPacket>result;

					const paginate = this.paginationService.paginate(
						data[0].total,
						currentPage,
						pageSize,
						20
					);

					transection_db.query(
						getOrdersSql,
						req.query.status
							? [
									req.query.status,
									paginate.pageSize,
									paginate.startIndex,
							  ]
							: req.query.orderNo
							? [
									req.query.orderNo,
									paginate.pageSize,
									paginate.startIndex,
							  ]
							: [paginate.pageSize, paginate.startIndex],
						(pError, pResult) => {
							if (pError) {
								console.log(pError);
								throw new Error("Internal server error.");
							}

							const data = pResult as RowDataPacket;

							const orders: OrderListItemModel[] = data.map(
								(e: {
									id: number;
									no: string;
									restaurant_id: number;
									delivery_time: Date;
									order_status_id: number;
									created_at: Date;
									total: number;
								}) =>
									new OrderListItemModel(
										e.id,
										e.no,
										e.restaurant_id,
										e.delivery_time,
										e.order_status_id,
										e.total
									)
							);

							const allOrderResponse = new AllOrderModel(
								orders,
								paginate
							);

							resolve(allOrderResponse);
						}
					);
				}
			);
		});
	}

	getOrders(
		restaurants: Array<number>,
		status?: number
	): Promise<OrderListItemModel[]> {
		const sql =
			"SELECT id, no, restaurant_id, delivery_time, order_status_id, (SELECT COUNT(*) FROM order_details WHERE order_id=orders.id) AS total FROM orders " +
			`WHERE ${
				status != undefined ? "order_status_id=?" : "order_status_id!=5"
			} ${restaurants.length > 0 ? "AND" : ""} ${restaurants
				.map((e) => "restaurant_id=" + e)
				.join(" OR ")} AND deleted_at IS NULL ORDER BY created_at DESC`;

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
							no: string;
							restaurant_id: number;
							delivery_time: Date;
							order_status_id: number;
							total: number;
						}) =>
							new OrderListItemModel(
								e.id,
								e.no,
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

	updateOrderStatusByOrderId(
		orderId: number,
		status: number
	): Promise<boolean> {
		const sql =
			"UPDATE orders SET order_status_id=? WHERE id=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			transection_db.query(sql, [status, orderId], (error, result) => {
				if (error) {
					console.log(error);
					throw new Error("Internal server error.");
				}

				const data = <OkPacket>result;

				if (data.affectedRows === 1) {
					resolve(true);
				}

				resolve(false);
			});
		});
	}

	async updateOrderDetailById(orderDetails: OrderDetail[]): Promise<boolean> {
		const sqlUpdate =
			"UPDATE order_details SET price=?, amount=?  WHERE id=? AND deleted_at IS NULL";
		const sqlDelete =
			"UPDATE order_details SET price=?, amount=? deleted_at=CURRENT_TIMESTAMP WHERE id=?";
		const batchSize = 1000; // Number of rows to update in each batch
		let offset = 0;

		try {
			while (offset < orderDetails.length) {
				const batch = orderDetails.slice(offset, offset + batchSize);

				transection_db.query("START TRANSACTION");

				try {
					const updatePromises = batch.map(async (item) => {
						transection_db.execute(
							item.deleted_at ? sqlDelete : sqlUpdate,
							[item.price, item.amount, item.id]
						);
					});

					await Promise.all(updatePromises);

					transection_db.query("COMMIT");
				} catch (error) {
					transection_db.query("ROLLBACK");
					throw error;
				}

				offset += batchSize;
			}

			return true;
		} catch (error) {
			return false;
		}
	}
}
