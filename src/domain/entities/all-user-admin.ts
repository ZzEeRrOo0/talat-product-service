import { PaginationResponse } from "../../core/pagination";
import { Admin } from "./admin";

export interface AllUserAdmin {
	orders: Array<Admin>;
	paginate: PaginationResponse;
}
