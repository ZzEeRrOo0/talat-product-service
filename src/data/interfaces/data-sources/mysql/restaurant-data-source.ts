import { RestaurantDetail } from '../../../../domain/entities/restaurant-detail'

export interface RestaurantDataSource {
	createRestaurant(customerId: number): Promise<number>;
	createRestaurantDetail(
		restaurantDetails: RestaurantDetail
	): Promise<number>;
}
