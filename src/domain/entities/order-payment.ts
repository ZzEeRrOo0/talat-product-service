export interface OrderPayment {
	id?: number;
	order_id: number;
	total_price: number;
	payment_type_id: number;
	payment_status_id: number;
	remark?: string;
}
