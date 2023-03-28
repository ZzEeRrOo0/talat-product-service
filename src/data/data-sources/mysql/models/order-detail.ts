import { OrderDetail } from "../../../../domain/entities/order-detail";

export class OrderDetailModel implements OrderDetail {
	id?: number | undefined;
	order_id: number;
	product_id: number;
	amount: number;
	order_time: Date;
	delivery_time: Date;
	delivery_location: string | undefined;
	order_status_id: number;
	remark?: string | undefined;

	constructor(
		$order_id: number,
		$product_id: number,
		$amount: number,
		$order_time: Date,
		$delivery_time: Date,
		$order_status_id: number | 1,
		$delivery_location?: string | undefined,
		$remark?: string | undefined,
		$id?: number | undefined
	) {
		this.order_id = $order_id;
		this.product_id = $product_id;
		this.amount = $amount;
		this.order_time = $order_time;
		this.delivery_time = $delivery_time;
		this.order_status_id = $order_status_id;
		this.delivery_location = $delivery_location;
		this.remark = $remark;
		this.id = $id;
	}
}
