import { Restaurant } from "../../../../domain/entities/restaurant";
import { RestaurantDetail } from "../../../../domain/entities/restaurant-detail";

export interface RestaurantDataSource {
	createRestaurant(customerId: number): Promise<number>;
	createRestaurantDetail(
		restaurantDetails: RestaurantDetail
	): Promise<number>;
	getRestaurants(customerId: number): Promise<Array<Restaurant>>;
	getRestaurantDetailByRestaurantId(
		restaurantId: number
	): Promise<RestaurantDetail | null>;
}
