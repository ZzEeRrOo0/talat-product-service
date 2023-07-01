import { JuristicPersonCustomer } from "../../entities/juristic-person-customer";
import { IndividualCustomer } from "../../entities/individual-customer";
import { AllUser } from "../../entities/all-users";
import { Request } from "express";
import { UserRequest } from "../../entities/user-request";
import { Customer } from "../../entities/customer";
import { User } from "../../entities/user";
import { AllIndividualCustomer } from "../../entities/all-individual-customer";
import { AllJuristicPersonCustomer } from "../../entities/all-juristic-person-customer";
import { AllUserAdmin } from "../../entities/all-user-admin";

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
	getAllIndividualCustomer(
		currentPage: number,
		pageSize: number
	): Promise<AllIndividualCustomer>;
	getAllJuristicPersonCustomer(
		currentPage: number,
		pageSize: number
	): Promise<AllJuristicPersonCustomer>;
	getAllUserAdmin(
		currentPage: number,
		pageSize: number
	): Promise<AllUserAdmin>;
	updatePassword(phone: string, password: string): Promise<boolean>;
}
