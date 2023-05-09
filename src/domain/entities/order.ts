export class Order {
	id?: number;
	order_no: string;
	restaurant_id: number;
	order_time?: Date;
	delivery_time: Date;
	delivery_location?: string;
	order_status_id: number | 1;
	remark?: string;

	constructor(
		$order_no: string,
		$restaurant_id: number,
		$delivery_time: Date,
		$order_status_id: number | 1,
		$order_time?: Date,
		$id?: number
	) {
		this.order_no = $order_no,
		this.restaurant_id = $restaurant_id,
		this.delivery_time = $delivery_time;
		this.order_status_id = $order_status_id;
		this.order_time = $order_time;
		this.id = $id;
	}
}
