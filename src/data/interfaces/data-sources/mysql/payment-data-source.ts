import { OrderPayment } from "../../../../domain/entities/order-payment";

export interface PaymentDataSource {
	createNewOrderPayment(
		orderId: number,
		total: number,
		paymentTypeId: number,
		paymentStatusId: number
	): Promise<number>;
	getOrderPaymentByOrderId(orderId: number): Promise<OrderPayment | null>;
	updateOrderPaymentStatus(
		status: number,
		orderId: number,
		paymentTypeId: number,
		total: number
	): Promise<boolean>;
}
