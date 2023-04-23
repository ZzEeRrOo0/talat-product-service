import { Restaurant } from "../../../../domain/entities/restaurant";

export class RestaurantModel implements Restaurant {
	restaurant_id: number;
	restaurant_name: string;
	restaurant_type_id: number;

	constructor($restaurant_id: number, $restaurant_name: string, $restaurant_type_id: number) {
		this.restaurant_id = $restaurant_id;
		this.restaurant_name = $restaurant_name;
		this.restaurant_type_id = $restaurant_type_id;
	}
}
