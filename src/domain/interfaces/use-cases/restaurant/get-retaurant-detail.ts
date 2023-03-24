import { RestaurantDetail } from "../../../entities/restaurant-detail";

export interface GetRestaurantDetailUseCase {
	execute(customerId: number): Promise<RestaurantDetail | null>;
}
