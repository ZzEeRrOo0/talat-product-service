import { PaymentDataSource } from "../../data/interfaces/data-sources/mysql/payment-data-source";
import { OrderPayment } from "../entities/order-payment";
import { PaymentRepository } from "../interfaces/repositories/payment-repository";

export class PaymentRepositoryImpl implements PaymentRepository {
	paymentDataSource: PaymentDataSource;

	constructor($paymentDataSource: PaymentDataSource) {
		this.paymentDataSource = $paymentDataSource;
	}

	async createNewOrderPayment(
		orderId: number,
		total: number,
		paymentTypeId: number
	): Promise<number> {
		return await this.paymentDataSource.createNewOrderPayment(
			orderId,
			total,
			paymentTypeId
		);
	}

	async getOrderPayment(orderId: number): Promise<OrderPayment | null> {
		return await this.paymentDataSource.getOrderPaymentByOrderId(orderId);
	}

	async updateOrderPaymentStatus(
		status: number,
		orderId: number,
		paymentTypeId: number,
		total: number
	): Promise<boolean> {
		return await this.paymentDataSource.updateOrderPaymentStatus(
			status,
			orderId,
			paymentTypeId,
			total
		);
	}
}
