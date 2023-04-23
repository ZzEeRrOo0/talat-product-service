import { RestaurantDataSource } from "../../data/interfaces/data-sources/mysql/restaurant-data-source";
import { Restaurant } from "../entities/restaurant";
import { RestaurantDetail } from "../entities/restaurant-detail";
import { RestaurantRepository } from "../interfaces/repositories/restaurant-repository";

export class RestaurantRepositoryImpl implements RestaurantRepository {
	restaurantDataSource: RestaurantDataSource;
	constructor(restaurantDataSource: RestaurantDataSource) {
		this.restaurantDataSource = restaurantDataSource;
	}

	async getRestaurants(customerId: number): Promise<Restaurant[]> {
		const result = await this.restaurantDataSource.getRestaurants(
			customerId
		);
		return result;
	}

	async getRestaurantDetail(
		restaurantId: number
	): Promise<RestaurantDetail | null> {
		const result =
			await this.restaurantDataSource.getRestaurantDetailByRestaurantId(
				restaurantId
			);
		return result;
	}

	async AddRestaurantDetail(
		restaurant_details: RestaurantDetail
	): Promise<number> {
		const result = await this.restaurantDataSource.createRestaurantDetail(
			restaurant_details
		);
		return result;
	}
	async AddRestaurant(customer_id: number): Promise<number> {
		const result = await this.restaurantDataSource.createRestaurant(
			customer_id
		);
		return result;
	}
}
