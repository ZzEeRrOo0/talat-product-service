import { JuristicPersonCustomer } from "../../../entities/juristic-person-customer";

export interface AddCustomerJuristicPersonUseCase {
	execute(customer: JuristicPersonCustomer): Promise<number>;
}
