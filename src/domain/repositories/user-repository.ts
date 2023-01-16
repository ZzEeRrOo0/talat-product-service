import { AllUser } from "../entities/all-users";
import { Request } from "express";
import { UserRepository } from "../interfaces/repositories/user-repository";
import { UserDataSource } from "../../data/interfaces/data-sources/mysql/user-data-source";



export class UserRepositoryImpl implements UserRepository {
    userDataSource: UserDataSource
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }

    async getUsers(
        currentPage: number,
        pageSize: number,
        req: Request
    ): Promise<AllUser> {
        const result = await this.userDataSource.getAll(
            currentPage,
            pageSize,
            req
        );
        return result;
    }
}