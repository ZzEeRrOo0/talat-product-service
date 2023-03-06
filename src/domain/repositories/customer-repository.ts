import { Customer } from "../entities/customer";
import { IndividualCustomer } from "../entities/individual-customer";
import { JuristicPersonCustomer } from "../entities/juristic-person-customer";
import { CustomerRepository } from "../interfaces/repositories/customer-repositoy";
import { CustomerDataSource } from "../../data/interfaces/data-sources/mysql/customer-data-source";

export class CustomerRepositoryImpl implements CustomerRepository {
	customerDatasource: CustomerDataSource;

	constructor($customerDatasource: CustomerDataSource) {
		this.customerDatasource = $customerDatasource;
	}

	async getCustomer(userId: number): Promise<Customer | null> {
		return await this.customerDatasource.getCustomerByUserId(userId);
	}
	async getIndividualCustomer(
		customerId: number
	): Promise<IndividualCustomer | null> {
		return await this.customerDatasource.getCustomerIndividualByCustomerId(
			customerId
		);
	}
	async getJuristicPersonCustomer(
		customerId: number
	): Promise<JuristicPersonCustomer | null> {
		return await this.customerDatasource.getCustomerJuristicPersonByCustomerId(
			customerId
		);
	}
}
