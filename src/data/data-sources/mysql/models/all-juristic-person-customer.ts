import { PaginationResponse } from "../../../../core/pagination";
import { AllJuristicPersonCustomer } from "../../../../domain/entities/all-juristic-person-customer";
import { JuristicPersonCustomer } from "../../../../domain/entities/juristic-person-customer";

export class AllJuristicPersonCustomerModel
	implements AllJuristicPersonCustomer
{
	customers: JuristicPersonCustomer[];
	paginate: PaginationResponse;

	constructor(
		$customers: JuristicPersonCustomer[],
		$paginate: PaginationResponse
	) {
		this.customers = $customers;
		this.paginate = $paginate;
	}
}
