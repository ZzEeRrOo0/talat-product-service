import { PaginationResponse } from "../../core/pagination/index";
import { OrderListItem } from "./order-list-item";

export interface AllOrder {
	orders: Array<OrderListItem>;
	paginate: PaginationResponse;
}
