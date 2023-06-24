import { PaginationResponse } from "../../core/pagination/index";
import { JuristicPersonCustomer } from "./juristic-person-customer";

export interface AllJuristicPersonCustomer {
	orders: Array<JuristicPersonCustomer>;
	paginate: PaginationResponse;
}
