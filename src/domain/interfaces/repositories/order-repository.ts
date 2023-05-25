import { Request } from "express";
import { AllOrder } from "../../entities/all-order";
import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import { OrderListItem } from "../../entities/order-list-item";

export interface OrderRepository {
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
	getOrderById(orderId: number): Promise<Order | null>;
	getOrderDetails(orderId: number): Promise<OrderDetail[]>;
	updateOrderStatus(orderId: number, status: number): Promise<boolean>;
}
