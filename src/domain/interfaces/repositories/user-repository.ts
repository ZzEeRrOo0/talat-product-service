import { JuristicPersonCustomer } from "../../entities/juristic-person-customer";
import { IndividualCustomer } from "../../entities/individual-customer";
import { AllUser } from "../../entities/all-users";
import { Request } from "express";
import { UserRequest } from "../../entities/user-request";
import { Customer } from "../../entities/customer";
import { User } from "../../entities/user";

export interface UserRepository {
	getUsers(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllUser>;
	getUserByPhoneNumberAndPasswordFromUserDB(
		phone: string,
		password: string
	): Promise<User | null>;
	getUserByPhoneNumberFromUserDB(phone: string): Promise<boolean>;
	addUser(user: UserRequest): Promise<number>;
	addCustomer(customer: Customer): Promise<number>;
	addCustomerIndividual(customer: IndividualCustomer): Promise<number>;
	addCustomerJuristicPerson(
		customer: JuristicPersonCustomer
	): Promise<number>;
	getUserByPhoneNumber(phone: string): Promise<boolean>;
}
