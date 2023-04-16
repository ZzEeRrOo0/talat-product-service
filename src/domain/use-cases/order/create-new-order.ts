import { Order } from "../../entities/order";
import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { CreateNewOrderUseCase } from "../../interfaces/use-cases/order/create-new-order";

export class CreateNewOrderUseCaseImpl implements CreateNewOrderUseCase {
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(order: Order): Promise<number> {
		return this.orderRepository.createNewOrder(order);
	}
}
