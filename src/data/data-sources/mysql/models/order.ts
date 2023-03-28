import { Order } from "../../../../domain/entities/order";

export class OrderModel implements Order {
	id?: number | undefined;
	restaurant_id: number;

	constructor($restaurant_id: number, $id?: number) {
		this.restaurant_id = $restaurant_id;
		this.id = $id;
	}
}
