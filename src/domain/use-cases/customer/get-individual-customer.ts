import { CustomerRepository } from "../../interfaces/repositories/customer-repositoy";
import { IndividualCustomer } from "../../entities/individual-customer";
import { GetIndividualCustomerUseCase } from "../../interfaces/use-cases/customer/get-individual-customer";

export class GetIndividualCustomer implements GetIndividualCustomerUseCase {
	customerRepository: CustomerRepository;

	constructor($customerRepository: CustomerRepository) {
		this.customerRepository = $customerRepository;
	}

	execute(customerId: number): Promise<IndividualCustomer | null> {
		return this.customerRepository.getIndividualCustomer(customerId);
	}
}
