import { PaginationResponse } from "../../core/pagination/index";
import { JuristicPersonCustomer } from "./juristic-person-customer";

export interface AllJuristicPersonCustomer {
	customers: Array<JuristicPersonCustomer>;
	paginate: PaginationResponse;
}
