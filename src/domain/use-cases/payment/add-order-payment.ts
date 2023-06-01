import { PaymentRepository } from "../../interfaces/repositories/payment-repository";
import { AddOrderPaymentUseCase } from "../../interfaces/use-cases/payment/add-order-payment";

export class AddOrderPaymentUseCaseImpl implements AddOrderPaymentUseCase {
	paymentRepository: PaymentRepository;

	constructor($paymentRepository: PaymentRepository) {
		this.paymentRepository = $paymentRepository;
	}

	execute(
		orderId: number,
		total: number,
		paymentTypeId: number
	): Promise<number> {
		return this.paymentRepository.createNewOrderPayment(
			orderId,
			total,
			paymentTypeId
		);
	}
}
