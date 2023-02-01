import { CreateRestaurantDetail } from "../../../entities/restaurant-detail";

export interface AddRestaurantDetailUseCase {
	execute(restaurant_details: CreateRestaurantDetail): Promise<number>;
}
