import { Request } from "express";
import { AllUser } from "../../../../domain/entities/all-users";
import { UserRequestModel } from "../../../data-sources/mysql/models/user-request";
import { CustomerModel } from "../../../data-sources/mysql/models/customer";
import { IndividualCustomerModel } from "../../../data-sources/mysql/models/individual-customer";
import { JuristicPersonCustomerModel } from "../../../data-sources/mysql/models/juristic-person-customer";
import { User } from "../../../../domain/entities/user";

export interface UserDataSource {
	getAll(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllUser>;
	getUserByPhoneNumberAndVerifyPassword(phone: string, password: string): Promise<User | null>;
	getUserByPhoneNumber(phone: string): Promise<boolean>;
	createUser(user: UserRequestModel): Promise<number>;
	createCustomer(customer: CustomerModel): Promise<number>;
	createIndividualCustomer(
		individualCustomer: IndividualCustomerModel
	): Promise<number>;
	createJuristicPersonCustomer(
		juristicPersonCustomer: JuristicPersonCustomerModel
	): Promise<number>;
}
