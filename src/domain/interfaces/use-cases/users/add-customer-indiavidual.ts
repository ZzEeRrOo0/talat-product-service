
import { CreateCustomerIndividual } from "../../../entities/create-customer-individual";

export interface AddCustomerIndividualUseCase {
    execute(customer: CreateCustomerIndividual): Promise<number>;
}