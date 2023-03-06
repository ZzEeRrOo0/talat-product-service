import { Customer } from "../../entities/customer";
import { IndividualCustomer } from "../../entities/individual-customer";
import { JuristicPersonCustomer } from "../../entities/juristic-person-customer";

export interface CustomerRepository {
	getCustomer(userId: number): Promise<Customer | null>;
	getIndividualCustomer(
		customerId: number
	): Promise<IndividualCustomer | null>;
	getJuristicPersonCustomer(
		customerId: number
	): Promise<JuristicPersonCustomer | null>;
}
