import { OrderListItem } from "../../../entities/order-list-item";

export interface GetOrderListUseCase {
	execute(
		restaurants: Array<number>,
		status?: number
	): Promise<OrderListItem[]>;
}
