import { Customer } from "../../../entities/customer";

export interface AddCustomerUseCase {
	execute(customer: Customer): Promise<number>;
}
