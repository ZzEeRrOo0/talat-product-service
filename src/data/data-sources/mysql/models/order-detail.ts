import { OrderDetail } from "../../../../domain/entities/order-detail";

export class OrderDetailModel implements OrderDetail {
	id?: number | undefined;
	order_id: number;
	product_id: number;
	price?: number | null;
	amount: number;

	constructor(
		$order_id: number,
		$product_id: number,
		$amount: number,
		$price?: number | null,
		$id?: number | undefined
	) {
		this.order_id = $order_id;
		this.product_id = $product_id;
		this.amount = $amount;
		this.price = $price;
		this.id = $id;
	}
}
