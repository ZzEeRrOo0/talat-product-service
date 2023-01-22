import { CreateCustomer } from "../../../entities/create-customer";

export interface AddCustomerUseCase {
    execute(customer: CreateCustomer): Promise<number>;
}