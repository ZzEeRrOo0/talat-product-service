import { PaginationResponse } from "../../core/pagination";
import { User } from "./user";

export interface AllUser {
	users: Array<User>;
	paginate: PaginationResponse;
}
