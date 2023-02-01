import { IndividualCustomer } from "../../entities/individual-customer";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { AddCustomerIndividualUseCase } from "../../interfaces/use-cases/users/add-customer-indiavidual";

export class AddCustomerIndividual implements AddCustomerIndividualUseCase {
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(customer: IndividualCustomer): Promise<number> {
		const result = await this.userRepository.addCustomerIndividual(
			customer
		);
		return result;
	}
}
