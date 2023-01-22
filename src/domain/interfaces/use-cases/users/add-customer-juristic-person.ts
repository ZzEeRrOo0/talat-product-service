import { CreateCustomerJuristicPerson } from "../../../entities/create-customer-juristic-person";

export interface AddCustomerJuristicPersonUseCase {
    execute(customer: CreateCustomerJuristicPerson): Promise<number>;
}