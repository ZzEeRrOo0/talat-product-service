import { OrderPayment } from "../../entities/order-payment";

export interface PaymentRepository {
	createNewOrderPayment(
		orderId: number,
		total: number,
		paymentTypeId: number
	): Promise<number>;
	getOrderPayment(orderId: number): Promise<OrderPayment | null>;
	updateOrderPaymentStatus(
		status: number,
		orderId: number,
		paymentTypeId: number,
		total: number
	): Promise<boolean>;
}
