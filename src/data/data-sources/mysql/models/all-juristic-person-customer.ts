import { PaginationResponse } from "../../../../core/pagination";
import { AllJuristicPersonCustomer } from "../../../../domain/entities/all-juristic-person-customer";
import { JuristicPersonCustomer } from "../../../../domain/entities/juristic-person-customer";

export class AllJuristicPersonCustomerModel
	implements AllJuristicPersonCustomer
{
	orders: JuristicPersonCustomer[];
	paginate: PaginationResponse;

	constructor(
		$orders: JuristicPersonCustomer[],
		$paginate: PaginationResponse
	) {
		this.orders = $orders;
		this.paginate = $paginate;
	}
}
