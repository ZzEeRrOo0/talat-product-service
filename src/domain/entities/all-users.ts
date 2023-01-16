import { PaginationResponse } from "../../core/pagination";
import { User } from "./user";

export class AllUser {
    users: Array<User>;
    paginate: PaginationResponse;

    constructor($users: Array<User>, $paginate: PaginationResponse) {
        this.users = $users;
        this.paginate = $paginate;
    }
}