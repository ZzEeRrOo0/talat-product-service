import { OrderDetail } from "../../../entities/order-detail";

export interface GetOrderDetailsUseCase {
	execute(orderId: number): Promise<OrderDetail[]>;
}
