import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import { OrderListItem } from "../../entities/order-list-item";

export interface OrderRepository {
	createNewOrder(order: Order): Promise<number>;
	addOrderDetail(orderDetail: OrderDetail): Promise<number>;
	getOrders(): Promise<OrderListItem[]>;
}
