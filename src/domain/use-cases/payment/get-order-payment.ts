import { OrderPayment } from "../../entities/order-payment";
import { PaymentRepository } from "../../interfaces/repositories/payment-repository";
import { GetOrderPaymentUseCase } from "../../interfaces/use-cases/payment/get-order-payment";

export class GetOrderPaymentUseCaseImpl implements GetOrderPaymentUseCase {
	paymentRepository: PaymentRepository;

	constructor($paymentRepository: PaymentRepository) {
		this.paymentRepository = $paymentRepository;
	}

	execute(orderId: number): Promise<OrderPayment | null> {
		return this.paymentRepository.getOrderPayment(orderId);
	}
}
