import { IndividualCustomer } from "../../../entities/individual-customer";

export interface AddCustomerIndividualUseCase {
	execute(customer: IndividualCustomer): Promise<number>;
}
