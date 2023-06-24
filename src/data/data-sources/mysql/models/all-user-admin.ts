import { PaginationResponse } from "../../../../core/pagination";
import { Admin } from "../../../../domain/entities/admin";
import { AllUserAdmin } from "../../../../domain/entities/all-user-admin";

export class AllUserAdminModel implements AllUserAdmin {
	orders: Admin[];
	paginate: PaginationResponse;

	constructor($orders: Admin[], $paginate: PaginationResponse) {
		this.orders = $orders;
		this.paginate = $paginate;
	}
}
