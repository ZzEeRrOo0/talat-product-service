export class ProductItemDetail {
	product_id: number;
	product_name: string;
	product_qty: number;
	product_price: number;
	product_size_type: string;
	image_url: string;

	constructor(
		$product_id: number,
		$product_name: string,
		$product_qty: number,
		$product_price: number,
		$product_size_type: string,
		$image_url: string
	) {
		this.product_id = $product_id;
		this.product_name = $product_name;
		this.product_qty = $product_qty;
		this.product_price = $product_price;
		this.product_size_type = $product_size_type;
		this.image_url = $image_url;
	}
}

export class OrderDetailResponse {
	order_id: number;
	order_no: string;
	restaurant_id: number;
	order_status_id: number;
	order_time: Date;
	delivery_time: Date;
	products: Array<ProductItemDetail>;

	constructor(
		$order_id: number,
		$order_no: string,
		$restaurant_id: number,
		$order_status_id: number,
		$order_time: Date,
		$delivery_time: Date,
		$products: Array<ProductItemDetail>
	) {
		this.order_id = $order_id;
		this.order_no = $order_no;
		this.restaurant_id = $restaurant_id;
		this.order_status_id = $order_status_id;
		this.order_time = $order_time;
		this.delivery_time = $delivery_time;
		this.products = $products;
	}
}
