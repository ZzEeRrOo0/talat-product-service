export class OrderDetail {
	id?: number;
	order_id: number;
	product_id: number;
	amount: number;

	constructor(
		$order_id: number,
		$product_id: number,
		$amount: number,
	) {
		this.order_id = $order_id;
		this.product_id = $product_id;
		this.amount = $amount;
	}
}
