import { RestaurantRepository } from "../../interfaces/repositories/restaurant-repository";
import { GetRestaurantListUseCase } from "../../interfaces/use-cases/restaurant/get-restaurant-list";
import { Restaurant } from "../../entities/restaurant";

export class GetRestaurantList implements GetRestaurantListUseCase {
	restaurantRepository: RestaurantRepository;
	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	async execute(customerId: number): Promise<Array<Restaurant>> {
		return await this.restaurantRepository.getRestaurants(customerId);
	}
}
