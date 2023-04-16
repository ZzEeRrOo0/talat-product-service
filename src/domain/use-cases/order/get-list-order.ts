import { OrderListItem } from "../../entities/order-list-item";
import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { GetOrderListUseCase } from "../../interfaces/use-cases/order/get-order-list";

export class GetOrderListUseCaseImpl implements GetOrderListUseCase {
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(status?: number): Promise<OrderListItem[]> {
		return this.orderRepository.getOrders(status);
	}
}
