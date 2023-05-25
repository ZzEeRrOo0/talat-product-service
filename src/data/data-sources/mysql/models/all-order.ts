import { PaginationResponse } from "../../../../core/pagination";
import { AllOrder } from "../../../../domain/entities/all-order";
import { OrderListItem } from "../../../../domain/entities/order-list-item";

export class AllOrderModel implements AllOrder {
	orders: OrderListItem[];
	paginate: PaginationResponse;

	constructor($orders: OrderListItem[], $paginate: PaginationResponse) {
		this.orders = $orders;
		this.paginate = $paginate;
	}
}
