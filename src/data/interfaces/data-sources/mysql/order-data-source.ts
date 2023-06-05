import { Request } from "express";
import { OrderDetail } from "../../../../domain/entities/order-detail";
import { OrderListItem } from "../../../../domain/entities/order-list-item";
import { Order } from "../../../../domain/entities/order";
import { AllOrder } from "../../../../domain/entities/all-order";

export interface OrderDataSource {
	createNewOrder(order: Order): Promise<number>;
	addOrderDetail(orderDetail: OrderDetail): Promise<number>;
	getAllOrder(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllOrder>;
	getOrders(
		restaurants: Array<number>,
		status?: number
	): Promise<OrderListItem[]>;
	getOrderByOrderId(orderId: number): Promise<Order | null>;
	getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]>;
	updateOrderStatusByOrderId(
		orderId: number,
		status: number
	): Promise<boolean>;
	updateOrderDetailById(orderDetails: OrderDetail[]): Promise<boolean>;
}
