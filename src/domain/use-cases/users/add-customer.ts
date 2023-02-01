import { Customer } from "../../entities/customer";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { AddCustomerUseCase } from "../../interfaces/use-cases/users/add-customer";

export class AddCustomer implements AddCustomerUseCase {
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(customer: Customer): Promise<number> {
		const result = await this.userRepository.addCustomer(customer);
		return result;
	}
}
