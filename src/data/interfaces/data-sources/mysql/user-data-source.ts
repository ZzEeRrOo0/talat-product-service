import { Request } from "express";
import { AllUser } from "../../../../domain/entities/all-users";
import { UserRequest } from "../../../../domain/entities/user-request";
import { Customer } from "../../../../domain/entities/customer";
import { IndividualCustomer } from "../../../../domain/entities/individual-customer";
import { JuristicPersonCustomer } from "../../../../domain/entities/juristic-person-customer";

export interface UserDataSource {
	getAll(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllUser>;
	createUser(user: UserRequest): Promise<number>;
	createCustomer(customer: Customer): Promise<number>;
	createIndividualCustomer(
		individualCustomer: IndividualCustomer
	): Promise<number>;
	createJuristicPersonCustomer(
		juristicPersonCustomer: JuristicPersonCustomer
	): Promise<number>;
}
