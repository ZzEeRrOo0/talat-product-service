import { OrderDetail } from "../../../../domain/entities/order-detail";

export class OrderDetailModel implements OrderDetail {
	id?: number | undefined;
	order_id: number;
	product_id: number;
	amount: number;

	constructor(
		$order_id: number,
		$product_id: number,
		$amount: number,
		$id?: number | undefined
	) {
		this.order_id = $order_id;
		this.product_id = $product_id;
		this.amount = $amount;
		this.id = $id;
	}
}
