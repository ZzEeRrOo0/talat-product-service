export class OrderDetail {
	id?: number;
	order_id: number;
	product_id: number;
	price?: number | null;
	amount: number;
	deleted_at?: Date | null | undefined;

	constructor(
		$order_id: number,
		$product_id: number,
		$amount: number,
		$price?: number | null,
		$deleted_at?: Date | null
	) {
		this.order_id = $order_id;
		this.product_id = $product_id;
		this.amount = $amount;
		this.price = $price;
		this.deleted_at = $deleted_at;
	}
}
