import { RestaurantDetail } from "../../entities/restaurant-detail";
import { RestaurantRepository } from "../../interfaces/repositories/restaurant-repository";
import { AddRestaurantDetailUseCase } from "../../interfaces/use-cases/restaurant/add-restaurant-detail";

export class AddRestaurantDetail implements AddRestaurantDetailUseCase {
	restaurantRepository: RestaurantRepository;
	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	async execute(restaurant_details: RestaurantDetail): Promise<number> {
		const result = await this.restaurantRepository.AddRestaurantDetail(
			restaurant_details
		);
		return result;
	}
}
