import { IndividualCustomer } from '../../../entities/individual-customer';

export interface GetIndividualCustomerUseCase {
	execute(customerId: number): Promise<IndividualCustomer | null>;
}
