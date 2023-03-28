export interface CreateNewOrderUseCase {
	execute(restaurantId: number): Promise<number>;
}
