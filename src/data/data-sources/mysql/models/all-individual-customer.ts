import { PaginationResponse } from "../../../../core/pagination";
import { AllIndividualCustomer } from "../../../../domain/entities/all-individual-customer";
import { IndividualCustomer } from "../../../../domain/entities/individual-customer";

export class AllIndividualCustomerModel implements AllIndividualCustomer {
	customers: IndividualCustomer[];
	paginate: PaginationResponse;

	constructor($customers: IndividualCustomer[], $paginate: PaginationResponse) {
		this.customers = $customers;
		this.paginate = $paginate;
	}
}
