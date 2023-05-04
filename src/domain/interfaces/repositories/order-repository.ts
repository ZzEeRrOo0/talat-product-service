import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import { OrderDetailResponse } from "../../entities/order-detail-response";
import { OrderListItem } from "../../entities/order-list-item";

export interface OrderRepository {
	createNewOrder(order: Order): Promise<number>;
	addOrderDetail(orderDetail: OrderDetail): Promise<number>;
	getOrders(
		restaurants: Array<number>,
		status?: number
	): Promise<OrderListItem[]>;
	getOrderById(orderId: number): Promise<Order | null>;
	getOrderDetails(orderId: number): Promise<OrderDetail[]>;
}
