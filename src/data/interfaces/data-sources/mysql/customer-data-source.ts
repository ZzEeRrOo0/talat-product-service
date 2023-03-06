import { Customer } from "../../../../domain/entities/customer";
import { IndividualCustomer } from "../../../../domain/entities/individual-customer";
import { JuristicPersonCustomer } from "../../../../domain/entities/juristic-person-customer";

export interface CustomerDataSource {
	getCustomerByUserId(userId: number): Promise<Customer | null>;
	getCustomerIndividualByCustomerId(customerId: number): Promise<IndividualCustomer | null>;
	getCustomerJuristicPersonByCustomerId(
		customerId: number
	): Promise<JuristicPersonCustomer | null>;
}
