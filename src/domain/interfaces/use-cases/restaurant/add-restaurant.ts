export interface AddRestaurantUseCase {
    execute(customer_id: number): Promise<number>;
}