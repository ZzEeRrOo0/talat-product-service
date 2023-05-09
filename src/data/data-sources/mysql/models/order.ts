import { Order } from "../../../../domain/entities/order";

export class OrderModel implements Order {
	id?: number | undefined;
	order_no: string;
	restaurant_id: number;
	order_time?: Date | undefined;
	delivery_time: Date;
	delivery_location?: string | undefined;
	order_status_id: number | 1;
	remark?: string | undefined;

	constructor(
		$order_no: string,
		$restaurant_id: number,
		$order_status_id: number,
		$delivery_time: Date,
		$order_time?: Date,
		$id?: number
	) {
		this.order_no = $order_no;
		this.restaurant_id = $restaurant_id;
		this.order_status_id = $order_status_id;
		this.delivery_time = $delivery_time;
		this.order_time = $order_time;
		this.id = $id;
	}
}
