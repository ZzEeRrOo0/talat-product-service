import { AllUser } from "../entities/all-users";
import { Request } from "express";
import { UserRepository } from "../interfaces/repositories/user-repository";
import { UserDataSource } from "../../data/interfaces/data-sources/mysql/user-data-source";
import { UserRequest } from "../entities/user-request";
import { Customer } from "../entities/customer";
import { IndividualCustomer } from "../entities/individual-customer";
import { JuristicPersonCustomer } from "../entities/juristic-person-customer";
import { FirebaseStorageDataSource } from "../../data/interfaces/data-sources/firebase/firebase-storage-data-source";
import { JuristicPersonCustomerModel } from "../../data/data-sources/mysql/models/juristic-person-customer";
import { IndividualCustomerModel } from "../../data/data-sources/mysql/models/individual-customer";
import { CustomerModel } from "../../data/data-sources/mysql/models/customer";
import { User } from "../entities/user";
export class UserRepositoryImpl implements UserRepository {
	userDataSource: UserDataSource;
	firebaseDataSource: FirebaseStorageDataSource;
	constructor(
		$userDataSource: UserDataSource,
		$firebaseDataSource: FirebaseStorageDataSource
	) {
		this.userDataSource = $userDataSource;
		this.firebaseDataSource = $firebaseDataSource;
	}

	async addCustomerJuristicPerson(
		customer: JuristicPersonCustomer
	): Promise<number> {
		const customerInfo = new JuristicPersonCustomerModel(
			customer.customer_id!,
			customer.company_name,
			customer.juristic_person_registration_number!,
			customer.registration_address
		);
		const result = await this.userDataSource.createJuristicPersonCustomer(
			customerInfo
		);
		return result;
	}
	async addCustomerIndividual(customer: IndividualCustomer): Promise<number> {
		const customerInfo = new IndividualCustomerModel(
			customer.customer_id!,
			customer.full_name,
			customer.id_card_number!,
			customer.address
		);
		const result = await this.userDataSource.createIndividualCustomer(
			customerInfo
		);
		return result;
	}
	async addCustomer(customer: Customer): Promise<number> {
		const customerInfo = new CustomerModel(
			customer.user_id!,
			customer.customer_type_id
		);
		const result = await this.userDataSource.createCustomer(customerInfo);
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

	async getUserByPhoneNumber(phone: string): Promise<boolean> {
		const result = await this.firebaseDataSource.getUserByPhoneNumber(
			phone
		);

		return result;
	}

	async getUserByPhoneNumberAndPasswordFromUserDB(
		phone: string,
		password: string
	): Promise<User | null> {
		return await this.userDataSource.getUserByPhoneNumberAndVerifyPassword(
			phone,
			password
		);
	}

	async getUserByPhoneNumberFromUserDB(phone: string): Promise<boolean> {
		return await this.userDataSource.getUserByPhoneNumber(phone);
	}
}
