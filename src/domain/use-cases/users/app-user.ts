import { UserRequest } from "../../entities/user-request";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { AddUserUseCase } from "../../interfaces/use-cases/users/add-user";

export class AddUser implements AddUserUseCase {
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(user: UserRequest): Promise<number> {
		const result = await this.userRepository.addUser(user);
		return result;
	}
}
