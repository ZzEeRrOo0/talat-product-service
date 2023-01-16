import { PaginationResponse } from "../../../../core/pagination";
import { AllUser } from "../../../../domain/entities/all-users";
import { User } from "../../../../domain/entities/user";


export class AllUserModel implements AllUser {
    users: User[];
    paginate: PaginationResponse;

    constructor($users: User[], $paginate: PaginationResponse) {
        this.users = $users;
        this.paginate = $paginate;
    }
}
