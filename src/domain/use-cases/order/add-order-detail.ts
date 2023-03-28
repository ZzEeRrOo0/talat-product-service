import { OrderDetail } from "../../entities/order-detail";
import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { AddOrderDetailUseCase } from "../../interfaces/use-cases/order/add-order-detail";

export class AddOrderDetailUseCaseImpl implements AddOrderDetailUseCase {
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(orderDetail: OrderDetail): Promise<number> {
		return this.orderRepository.addOrderDetail(orderDetail);
	}
}
