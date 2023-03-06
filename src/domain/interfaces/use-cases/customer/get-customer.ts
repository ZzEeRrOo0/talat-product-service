import { Customer } from "../../../entities/customer";

export interface GetCustomerUseCase {
	execute(userId: number): Promise<Customer | null>;
}
