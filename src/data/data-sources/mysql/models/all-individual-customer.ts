import { PaginationResponse } from "../../../../core/pagination";
import { AllIndividualCustomer } from "../../../../domain/entities/all-individual-customer";
import { IndividualCustomer } from "../../../../domain/entities/individual-customer";

export class AllIndividualCustomerModel implements AllIndividualCustomer {
	orders: IndividualCustomer[];
	paginate: PaginationResponse;

	constructor($orders: IndividualCustomer[], $paginate: PaginationResponse) {
		this.orders = $orders;
		this.paginate = $paginate;
	}
}
