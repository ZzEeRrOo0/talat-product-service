import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetUserByPhoneNumberFromUserDBUseCase } from "../../interfaces/use-cases/users/get-user-by-phone-number-from-user-db";

export class GetUserByPhoneNumberFromUserDB
	implements GetUserByPhoneNumberFromUserDBUseCase
{
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
	async execute(phone: string): Promise<boolean> {
		const result = await this.userRepository.getUserByPhoneNumberFromUserDB(
			phone
		);

		return result;
	}
}
