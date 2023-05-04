export class ProductItemDetail {
	product_id: number;
	product_name: string;
	product_qty: number;

	constructor(
		$product_id: number,
		$product_name: string,
		$product_qty: number
	) {
		this.product_id = $product_id;
		this.product_name = $product_name;
		this.product_qty = $product_qty;
	}
}

export class OrderDetailResponse {
	order_id: number;
	restaurant_id: number;
	order_status_id: number;
	order_time: Date;
	delivery_time: Date;
	products: Array<ProductItemDetail>;

	constructor(
		$order_id: number,
		$restaurant_id: number,
		$order_status_id: number,
		$order_time: Date,
		$delivery_time: Date,
		$products: Array<ProductItemDetail>
	) {
		this.order_id = $order_id;
		this.restaurant_id = $restaurant_id;
		this.order_status_id = $order_status_id;
		this.order_time = $order_time;
		this.delivery_time = $delivery_time;
		this.products = $products;
	}
}
