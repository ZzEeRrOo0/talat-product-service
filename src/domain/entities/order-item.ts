export class OrderItem {
	id: number;
	restaurant_id: number;
	order_time: Date;
	delivery_time: Date;
	order_status_id: number;

	constructor(
		$order_id: number,
		$restaurant_id: number,
		$order_time: Date,
		$delivery_time: Date,
		$order_status_id: number
	) {
		this.id = $order_id;
		this.restaurant_id = $restaurant_id;
		this.order_time = $order_time;
		this.delivery_time = $delivery_time;
		this.order_status_id = $order_status_id;
	}
}
