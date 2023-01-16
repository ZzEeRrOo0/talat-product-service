import { Request } from "express";
import { AllUser } from "../../../../domain/entities/all-users";

export interface UserDataSource {
    getAll(currentPage: number, pageSize: number, req: Request): Promise<AllUser>;
}