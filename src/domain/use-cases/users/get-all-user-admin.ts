import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetAllUserAdminUseCase } from "../../interfaces/use-cases/users/get-all-user-admin";
import { AllUserAdmin } from "../../entities/all-user-admin";

export class GetAllUserAdmin implements GetAllUserAdminUseCase {
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(
		currentPage: number,
		pageSize: number
	): Promise<AllUserAdmin> {
		const result = await this.userRepository.getAllUserAdmin(
			currentPage,
			pageSize
		);
		return result;
	}
}
