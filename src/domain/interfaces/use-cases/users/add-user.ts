import { CreateUser } from "../../../entities/create-user";

export interface AddUserUseCase {
    execute(user: CreateUser): Promise<number>;
}