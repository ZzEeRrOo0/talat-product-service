import { RestaurantDetail } from "../../../entities/restaurant-detail";

export interface GetRestaurantDetailUseCase {
	execute(restaurantId: number): Promise<RestaurantDetail | null>;
}
