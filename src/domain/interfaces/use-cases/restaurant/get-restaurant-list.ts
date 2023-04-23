import { Restaurant } from "../../../entities/restaurant";

export interface GetRestaurantListUseCase {
	execute(customerId: number): Promise<Array<Restaurant>>;
}
