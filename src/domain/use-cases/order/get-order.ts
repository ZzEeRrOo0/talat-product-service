import { Order } from "../../entities/order";
import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { GetOrderUseCase } from "../../interfaces/use-cases/order/get-order";

export class GetOrderUseCaseImpl implements GetOrderUseCase {
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(orderId: number): Promise<Order | null> {
		return this.orderRepository.getOrderById(orderId);
	}
}
