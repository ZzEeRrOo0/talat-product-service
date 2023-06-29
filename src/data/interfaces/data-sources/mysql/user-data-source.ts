import { Request } from "express";
import { AllUser } from "../../../../domain/entities/all-users";
import { UserRequestModel } from "../../../data-sources/mysql/models/user-request";
import { CustomerModel } from "../../../data-sources/mysql/models/customer";
import { IndividualCustomerModel } from "../../../data-sources/mysql/models/individual-customer";
import { JuristicPersonCustomerModel } from "../../../data-sources/mysql/models/juristic-person-customer";
import { User } from "../../../../domain/entities/user";
import { AllIndividualCustomer } from "../../../../domain/entities/all-individual-customer";
import { AllJuristicPersonCustomer } from "../../../../domain/entities/all-juristic-person-customer";
import { AllUserAdmin } from "../../../../domain/entities/all-user-admin";

export interface UserDataSource {
	getAll(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllUser>;
	getUserByPhoneNumberAndVerifyPassword(
		phone: string,
		password: string
	): Promise<User | null>;
	getUserByPhoneNumber(phone: string): Promise<boolean>;
	createUser(user: UserRequestModel): Promise<number>;
	createCustomer(customer: CustomerModel): Promise<number>;
	createIndividualCustomer(
		individualCustomer: IndividualCustomerModel
	): Promise<number>;
	createJuristicPersonCustomer(
		juristicPersonCustomer: JuristicPersonCustomerModel
	): Promise<number>;
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
	updatePassword(userId: number, password: string): Promise<boolean>;
}
