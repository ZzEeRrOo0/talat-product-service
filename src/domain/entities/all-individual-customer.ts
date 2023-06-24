import { PaginationResponse } from "../../core/pagination/index";
import { IndividualCustomer } from "./individual-customer";

export interface AllIndividualCustomer {
	customers: Array<IndividualCustomer>;
	paginate: PaginationResponse;
}
