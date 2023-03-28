import { OrderDetail } from "../../../entities/order-detail";

export interface AddOrderDetailUseCase {
	execute(orderDetail: OrderDetail): Promise<number>;
}
