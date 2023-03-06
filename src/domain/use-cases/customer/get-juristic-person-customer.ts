import { CustomerRepository } from "../../interfaces/repositories/customer-repositoy";
import { IndividualCustomer } from "../../entities/individual-customer";
import { GetJuristicPersonCustomerUseCase } from "../../interfaces/use-cases/customer/get-juristic-person-customer";
import { JuristicPersonCustomer } from "../../entities/juristic-person-customer";

export class GetJuristicPersonCustomer
	implements GetJuristicPersonCustomerUseCase
{
	customerRepository: CustomerRepository;

	constructor($customerRepository: CustomerRepository) {
		this.customerRepository = $customerRepository;
	}

	execute(customerId: number): Promise<JuristicPersonCustomer | null> {
		return this.customerRepository.getJuristicPersonCustomer(customerId);
	}
}
