import { PaginationResponse } from "../../core/pagination/index";
import { IndividualCustomer } from "./individual-customer";

export interface AllIndividualCustomer {
	orders: Array<IndividualCustomer>;
	paginate: PaginationResponse;
}
