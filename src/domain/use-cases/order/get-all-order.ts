import { Request } from "express";
import { OrderRepository } from "../../interfaces/repositories/order-repository";
import { GetAllOrderUseCase } from "../../interfaces/use-cases/order/get-all-order";
import { AllOrder } from "../../entities/all-order";

export class GetAllOrderUseCaseImpl implements GetAllOrderUseCase {
	orderRepository: OrderRepository;

	constructor($orderRepository: OrderRepository) {
		this.orderRepository = $orderRepository;
	}

	execute(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllOrder> {
		return this.orderRepository.getAllOrder(currentPage, pageSize, req);
	}
}
