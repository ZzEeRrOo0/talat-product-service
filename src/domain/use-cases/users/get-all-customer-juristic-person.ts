import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetAllCustomerJuristicPersonUseCase } from "../../interfaces/use-cases/users/get-all-customer-juristic-person";
import { AllJuristicPersonCustomer } from "../../entities/all-juristic-person-customer";

export class GetAllCustomerJuristicPerson
	implements GetAllCustomerJuristicPersonUseCase
{
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(
		currentPage: number,
		pageSize: number
	): Promise<AllJuristicPersonCustomer> {
		const result = await this.userRepository.getAllJuristicPersonCustomer(
			currentPage,
			pageSize
		);
		return result;
	}
}
