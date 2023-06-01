import { PaymentRepository } from "../../interfaces/repositories/payment-repository";
import { UpdateOrderPaymentStatusUseCase } from "../../interfaces/use-cases/payment/update-order-payment-status";

export class UpdateOrderPaymentStatusUseCaseImpl
	implements UpdateOrderPaymentStatusUseCase
{
	paymentRepository: PaymentRepository;

	constructor($paymentRepository: PaymentRepository) {
		this.paymentRepository = $paymentRepository;
	}

	execute(
		status: number,
		orderId: number,
		paymentTypeId: number,
		total: number
	): Promise<boolean> {
		return this.paymentRepository.updateOrderPaymentStatus(
			status,
			orderId,
			paymentTypeId,
			total
		);
	}
}
