import { JuristicPersonCustomer } from "../../entities/juristic-person-customer";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { AddCustomerJuristicPersonUseCase } from "../../interfaces/use-cases/users/add-customer-juristic-person";

export class AddCustomerJuristicPerson
	implements AddCustomerJuristicPersonUseCase
{
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(customer: JuristicPersonCustomer): Promise<number> {
		const result = await this.userRepository.addCustomerJuristicPerson(
			customer
		);
		return result;
	}
}
