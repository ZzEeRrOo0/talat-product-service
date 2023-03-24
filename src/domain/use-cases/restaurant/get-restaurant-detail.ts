import { GetRestaurantDetailUseCase } from "../../interfaces/use-cases/restaurant/get-retaurant-detail";
import { RestaurantRepository } from "../../interfaces/repositories/restaurant-repository";
import { RestaurantDetail } from "../../entities/restaurant-detail";

export class GetRestaurantDetail implements GetRestaurantDetailUseCase {
	restaurantRepository: RestaurantRepository;
	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	async execute(customerId: number): Promise<RestaurantDetail | null> {
		return await this.restaurantRepository.getRestaurantDetail(customerId);
	}
}
