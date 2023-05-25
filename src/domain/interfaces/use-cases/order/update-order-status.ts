export interface UpdateOrderStatusUseCase {
	execute(orderId: number, status: number): Promise<boolean>;
}
