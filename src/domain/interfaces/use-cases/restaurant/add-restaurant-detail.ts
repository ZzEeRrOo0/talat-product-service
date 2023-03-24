import { RestaurantDetail } from '../../../entities/restaurant-detail';

export interface AddRestaurantDetailUseCase {
	execute(restaurant_details: RestaurantDetail): Promise<number>;
}
