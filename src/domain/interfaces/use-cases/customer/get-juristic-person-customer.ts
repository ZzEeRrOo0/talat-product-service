import { JuristicPersonCustomer } from "../../../entities/juristic-person-customer";

export interface GetJuristicPersonCustomerUseCase {
	execute(customerId: number): Promise<JuristicPersonCustomer | null>;
}
