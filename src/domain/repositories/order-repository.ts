import { OrderDetail } from "../entities/order-detail";
import { OrderRepository } from "../interfaces/repositories/order-repository";
import { OrderDataSource } from "../../data/interfaces/data-sources/mysql/order-data-source";

export class OrderRepositoryImpl implements OrderRepository {
	orderDataSource: OrderDataSource;

	constructor($orderDataSource: OrderDataSource) {
		this.orderDataSource = $orderDataSource;
	}

	async createNewOrder(restaurantId: number): Promise<number> {
		return await this.orderDataSource.createNewOrder(restaurantId);
	}

	async addOrderDetail(orderDetail: OrderDetail): Promise<number> {
		return await this.orderDataSource.addOrderDetail(orderDetail);
	}
}
