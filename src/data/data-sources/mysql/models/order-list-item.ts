import { OrderListItem } from "../../../../domain/entities/order-list-item";

export class OrderListItemModel implements OrderListItem {
	id: number;
	restaurant_id: number;
	delivery_time: Date;
	order_status_id: number;
	total_product: number;

	constructor(
		$order_id: number,
		$restaurant_id: number,
		$delivery_time: Date,
		$order_status_id: number,
		$total_product: number
	) {
		this.id = $order_id;
		this.restaurant_id = $restaurant_id;
		this.delivery_time = $delivery_time;
		this.order_status_id = $order_status_id;
		this.total_product = $total_product;
	}
}
