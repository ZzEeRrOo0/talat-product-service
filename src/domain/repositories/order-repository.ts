import { Request } from "express";
import { OrderDetail } from "../entities/order-detail";
import { OrderRepository } from "../interfaces/repositories/order-repository";
import { OrderDataSource } from "../../data/interfaces/data-sources/mysql/order-data-source";
import { OrderListItem } from "../entities/order-list-item";
import { Order } from "../entities/order";
import { AllOrder } from "../entities/all-order";

export class OrderRepositoryImpl implements OrderRepository {
	orderDataSource: OrderDataSource;

	constructor($orderDataSource: OrderDataSource) {
		this.orderDataSource = $orderDataSource;
	}

	async createNewOrder(order: Order): Promise<number> {
		return await this.orderDataSource.createNewOrder(order);
	}

	async addOrderDetail(orderDetail: OrderDetail): Promise<number> {
		return await this.orderDataSource.addOrderDetail(orderDetail);
	}

	async getAllOrder(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllOrder> {
		return await this.orderDataSource.getAllOrder(
			currentPage,
			pageSize,
			req
		);
	}

	async getOrders(
		restaurants: Array<number>,
		status?: number
	): Promise<OrderListItem[]> {
		return await this.orderDataSource.getOrders(restaurants, status);
	}

	async getOrderById(orderId: number): Promise<Order | null> {
		return await this.orderDataSource.getOrderByOrderId(orderId);
	}

	async getOrderDetails(orderId: number): Promise<OrderDetail[]> {
		return await this.orderDataSource.getOrderDetailByOrderId(orderId);
	}

	async updateOrderStatus(orderId: number, status: number): Promise<boolean> {
		return await this.orderDataSource.updateOrderStatusByOrderId(
			orderId,
			status
		);
	}

	async updateOrderDetails(orderDetails: OrderDetail[]): Promise<boolean> {
		return await this.orderDataSource.updateOrderDetailById(orderDetails);
	}
}
