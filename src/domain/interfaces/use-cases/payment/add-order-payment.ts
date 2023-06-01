export interface AddOrderPaymentUseCase {
	execute(
		orderId: number,
		total: number,
		paymentTypeId: number
	): Promise<number>;
}
