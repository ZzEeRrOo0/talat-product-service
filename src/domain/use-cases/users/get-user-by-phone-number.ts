import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetUserByPhoneNumberUseCase } from "../../interfaces/use-cases/users/get-user-by-phone-number";

export class GetUserByPhoneNumber implements GetUserByPhoneNumberUseCase {
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
	async execute(phone: string): Promise<boolean> {
		const result = await this.userRepository.getUserByPhoneNumber(phone);

		return result;
	}
}
