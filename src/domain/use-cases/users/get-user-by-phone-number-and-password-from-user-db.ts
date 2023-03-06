import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetUserByPhoneNumberAndPasswordFromUserDBUseCase } from "../../interfaces/use-cases/users/get-user-by-phone-number-and-password-from-user-db";

export class GetUserByPhoneNumberAndPasswordFromUserDB
	implements GetUserByPhoneNumberAndPasswordFromUserDBUseCase
{
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
	async execute(phone: string, password: string): Promise<User | null> {
		return await this.userRepository.getUserByPhoneNumberAndPasswordFromUserDB(
			phone,
			password
		);
	}
}
