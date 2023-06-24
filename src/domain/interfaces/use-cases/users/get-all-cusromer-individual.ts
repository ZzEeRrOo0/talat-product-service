import { AllIndividualCustomer } from "../../../entities/all-individual-customer";

export interface GetAllCustomerIndividualUseCase {
	execute(
		currentPage: number,
		pageSize: number
	): Promise<AllIndividualCustomer>;
}
