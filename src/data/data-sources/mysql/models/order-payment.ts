import { OrderPayment } from "../../../../domain/entities/order-payment";

export class OrderPaymentModel implements OrderPayment {
	id?: number | undefined;
	order_id: number;
	total_price: number;
	payment_type_id: number;
	payment_status_id: number;
	remark?: string | undefined;

	constructor(
		$order_id: number,
		$total_price: number,
		$payment_type_id: number,
		$payment_status_id: number
	) {
		this.order_id = $order_id;
		this.total_price = $total_price;
		this.payment_type_id = $payment_type_id;
		this.payment_status_id = $payment_status_id;
	}
}
