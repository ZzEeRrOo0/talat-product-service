export class Order {
	id?: number;
	restaurant_id: number;
	delivery_time: Date;
	delivery_location?: string;
	order_status_id: number | 1;
	remark?: string;

	constructor(
		$restaurant_id: number,
		$delivery_time: Date,
		$order_status_id: number | 1
	) {
		this.restaurant_id = $restaurant_id;
		this.delivery_time = $delivery_time;
		this.order_status_id = $order_status_id;
	}
}
