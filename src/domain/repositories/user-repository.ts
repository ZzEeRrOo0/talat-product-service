import { AllUser } from "../entities/all-users";
import { Request } from "express";
import { UserRepository } from "../interfaces/repositories/user-repository";
import { UserDataSource } from "../../data/interfaces/data-sources/mysql/user-data-source";
import { UserRequest } from "../entities/user-request";
import { Customer } from "../entities/customer";
import { IndividualCustomer } from "../entities/individual-customer";
import { JuristicPersonCustomer } from "../entities/juristic-person-customer";

export class UserRepositoryImpl implements UserRepository {
	userDataSource: UserDataSource;
	constructor(userDataSource: UserDataSource) {
		this.userDataSource = userDataSource;
	}

	async addCustomerJuristicPerson(
		customer: JuristicPersonCustomer
	): Promise<number> {
		const result = await this.userDataSource.createJuristicPersonCustomer(
			customer
		);
		return result;
	}
	async addCustomerIndividual(customer: IndividualCustomer): Promise<number> {
		const result = await this.userDataSource.createIndividualCustomer(
			customer
		);
		return result;
	}
	async addCustomer(customer: Customer): Promise<number> {
		const result = await this.userDataSource.createCustomer(customer);
		return result;
	}
	async addUser(user: UserRequest): Promise<number> {
		const result = await this.userDataSource.createUser(user);
		return result;
	}

	async getUsers(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllUser> {
		const result = await this.userDataSource.getAll(
			currentPage,
			pageSize,
			req
		);
		return result;
	}
}
