export class OrderDetail {
	id?: number;
	order_id: number;
	product_id: number;
	amount: number;
	order_time: Date;
	delivery_time: Date;
	delivery_location?: string;
	order_status_id: number | 1;
	remark?: string;

	constructor(
		$order_id: number,
		$product_id: number,
		$amount: number,
		$order_time: Date,
		$delivery_time: Date,
		$order_status_id: number
	) {
		this.order_id = $order_id;
		this.product_id = $product_id;
		this.amount = $amount;
		this.order_time = $order_time;
		this.delivery_time = $delivery_time;
		this.order_status_id = $order_status_id;
	}
}
