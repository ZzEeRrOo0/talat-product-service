import { PaginationResponse } from "../../core/pagination";
import { Admin } from "./admin";

export interface AllUserAdmin {
	users: Array<Admin>;
	paginate: PaginationResponse;
}
