import { OrderDetail } from "../../entities/order-detail";
import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { GetOrderDetailsUseCase } from "../../interfaces/use-cases/order/get-order-detail";

export class GetOrderDetailsUseCaseImpl implements GetOrderDetailsUseCase {
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(orderId: number): Promise<OrderDetail[]> {
		return this.orderRepository.getOrderDetails(orderId);
	}
}
