import { RestaurantDetail } from "../../entities/restaurant-detail";

export interface RestaurantRepository {
	AddRestaurant(customer_id: number): Promise<number>;
	AddRestaurantDetail(restaurant_details: RestaurantDetail): Promise<number>;
	getRestaurantDetail(customerId: number): Promise<RestaurantDetail | null>;
}
