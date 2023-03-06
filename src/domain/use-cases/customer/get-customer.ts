import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../interfaces/repositories/customer-repositoy";
import { GetCustomerUseCase } from "../../interfaces/use-cases/customer/get-customer";

export class GetCustomer implements GetCustomerUseCase {
	customerRepository: CustomerRepository;

	constructor($customerRepository: CustomerRepository) {
		this.customerRepository = $customerRepository;
	}

	execute(userId: number): Promise<Customer | null> {
		return this.customerRepository.getCustomer(userId);
	}
}
