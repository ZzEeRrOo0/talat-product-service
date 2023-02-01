import { CreateRestaurantDetail } from "../../entities/restaurant-detail";

export interface RestaurantRepository {
	AddRestaurant(customer_id: number): Promise<number>;
	AddRestaurantDetail(
		restaurant_details: CreateRestaurantDetail
	): Promise<number>;
}
