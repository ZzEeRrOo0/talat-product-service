import { AllUser } from "../../entities/all-users";
import { Request } from "express";

export interface UserRepository {

    getUsers(
        currentPage: number,
        pageSize: number,
        req: Request
    ): Promise<AllUser>;
}