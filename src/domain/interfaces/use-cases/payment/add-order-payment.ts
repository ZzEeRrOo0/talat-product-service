export interface AddOrderPaymentUseCase {
	execute(
		orderId: number,
		total: number,
		paymentTypeId: number,
		paymentStatusId: number
	): Promise<number>;
}
