import { OrderPayment } from "../../../entities/order-payment";

export interface GetOrderPaymentUseCase {
	execute(orderId: number): Promise<OrderPayment | null>;
}
