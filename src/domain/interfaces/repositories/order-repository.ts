import { OrderDetail } from "../../entities/order-detail";

export interface OrderRepository {
	createNewOrder(restaurantId: number): Promise<number>;
	addOrderDetail(orderDetail: OrderDetail): Promise<number>;
}
