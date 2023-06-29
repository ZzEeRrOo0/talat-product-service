import { UserRepository } from "../../interfaces/repositories/user-repository";
import { ResetPasswordUseCase } from "../../interfaces/use-cases/users/reset-password";

export class ResetPassword implements ResetPasswordUseCase {
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(userId: number, password: string): Promise<boolean> {
		const result = await this.userRepository.updatePassword(
			userId,
			password
		);
		return result;
	}
}
