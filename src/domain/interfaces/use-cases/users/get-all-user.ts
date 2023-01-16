import { Request } from "express";
import { AllUser } from "../../../entities/all-users";

export interface GetAllUsersUseCase {
    execute(
        currentPage: number,
        pageSize: number,
        req: Request
    ): Promise<AllUser>;
}
