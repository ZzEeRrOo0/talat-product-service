import { Restaurant } from "../../entities/restaurant";
import { RestaurantDetail } from "../../entities/restaurant-detail";

export interface RestaurantRepository {
	AddRestaurant(customer_id: number): Promise<number>;
	AddRestaurantDetail(restaurant_details: RestaurantDetail): Promise<number>;
	getRestaurants(customerId: number): Promise<Array<Restaurant>>;
	getRestaurantDetail(restaurantId: number): Promise<RestaurantDetail | null>;
}
