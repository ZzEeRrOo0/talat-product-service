import { OrderDetail } from "../../../../domain/entities/order-detail";
import { OrderListItem } from "../../../../domain/entities/order-list-item";
import { Order } from "../../../../domain/entities/order";

export interface OrderDataSource {
	createNewOrder(order: Order): Promise<number>;
	addOrderDetail(orderDetail: OrderDetail): Promise<number>;
	getOrders(restaurants: Array<number>, status?: number): Promise<OrderListItem[]>;
}
