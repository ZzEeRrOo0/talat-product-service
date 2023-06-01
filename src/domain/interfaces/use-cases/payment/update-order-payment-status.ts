export interface UpdateOrderPaymentStatusUseCase {
	execute(
		status: number,
		orderId: number,
		paymentTypeId: number,
		total: number
	): Promise<boolean>;
}
