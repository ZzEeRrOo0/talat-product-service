import { OrderDetail } from "../../../../domain/entities/order-detail";

export interface OrderDataSource {
	createNewOrder(restaurantId: number): Promise<number>;
	addOrderDetail(orderDetail: OrderDetail): Promise<number>;
}
