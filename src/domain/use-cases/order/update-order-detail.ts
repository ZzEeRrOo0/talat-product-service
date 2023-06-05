import { OrderDetail } from "../../entities/order-detail";
import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { UpdateOrderDetailsUseCase } from "../../interfaces/use-cases/order/update-order-detail";

export class UpdateOrderDetailsUseCaseImpl
	implements UpdateOrderDetailsUseCase
{
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(orderDetails: OrderDetail[]): Promise<boolean> {
		return this.orderRepository.updateOrderDetails(orderDetails);
	}
}
