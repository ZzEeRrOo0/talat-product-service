import { OrderListItem } from "../../../entities/order-list-item";

export interface GetOrderListUseCase {
	execute(status?: number): Promise<OrderListItem[]>;
}
