import { Request } from "express";
import { AllUser } from "../../entities/all-users";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetAllUsersUseCase } from "../../interfaces/use-cases/users/get-all-user";


export class GetAllUsers implements GetAllUsersUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(currentPage: number, pageSize: number, req: Request): Promise<AllUser> {
        const result = await this.userRepository.getUsers(currentPage, pageSize, req);
        return result
    }
}