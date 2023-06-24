import { PaginationResponse } from "../../../../core/pagination";
import { Admin } from "../../../../domain/entities/admin";
import { AllUserAdmin } from "../../../../domain/entities/all-user-admin";

export class AllUserAdminModel implements AllUserAdmin {
	users: Admin[];
	paginate: PaginationResponse;

	constructor($users: Admin[], $paginate: PaginationResponse) {
		this.users = $users;
		this.paginate = $paginate;
	}
}
