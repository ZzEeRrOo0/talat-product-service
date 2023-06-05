import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { UpdateOrderStatusUseCase } from "../../interfaces/use-cases/order/update-order-status";

export class UpdateOrderStatusUseCaseImpl implements UpdateOrderStatusUseCase {
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(orderId: number, status: number): Promise<boolean> {
		return this.orderRepository.updateOrderStatus(orderId, status);
	}
}
