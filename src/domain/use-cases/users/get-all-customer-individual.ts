import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetAllCustomerIndividualUseCase } from "../../interfaces/use-cases/users/get-all-cusromer-individual";
import { AllIndividualCustomer } from "../../entities/all-individual-customer";

export class GetAllCustomerIndividual
	implements GetAllCustomerIndividualUseCase
{
	userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(
		currentPage: number,
		pageSize: number
	): Promise<AllIndividualCustomer> {
		const result = await this.userRepository.getAllIndividualCustomer(
			currentPage,
			pageSize
		);
		return result;
	}
}
