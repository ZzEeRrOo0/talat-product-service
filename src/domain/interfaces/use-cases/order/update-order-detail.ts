import { OrderDetail } from "../../../entities/order-detail";

export interface UpdateOrderDetailsUseCase {
	execute(orderDetails: OrderDetail[]): Promise<boolean>;
}
