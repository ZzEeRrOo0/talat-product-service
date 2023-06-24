import { AllJuristicPersonCustomer } from "../../../entities/all-juristic-person-customer";

export interface GetAllCustomerJuristicPersonUseCase {
	execute(
		currentPage: number,
		pageSize: number
	): Promise<AllJuristicPersonCustomer>;
}
