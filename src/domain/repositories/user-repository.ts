import { AllUser } from "../entities/all-users";
import { Request } from "express";
import { UserRepository } from "../interfaces/repositories/user-repository";
import { UserDataSource } from "../../data/interfaces/data-sources/mysql/user-data-source";
import { CreateUser } from "../entities/create-user";
import { CreateCustomer } from "../entities/create-customer";
import { CreateCustomerIndividual } from "../entities/create-customer-individual";
import { CreateCustomerJuristicPerson } from "../entities/create-customer-juristic-person";



export class UserRepositoryImpl implements UserRepository {
    userDataSource: UserDataSource
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }

    async addCustomerJuristicPerson(customer: CreateCustomerJuristicPerson): Promise<number> {
        const result = await this.userDataSource.createCustomerJuristicPerson(
            customer
        );
        return result;
    }
    async addCustomerIndividual(customer: CreateCustomerIndividual): Promise<number> {
        const result = await this.userDataSource.createCustomerIndividual(
            customer
        );
        return result;
    }
    async addCustomer(customer: CreateCustomer): Promise<number> {
        const result = await this.userDataSource.createCustomer(
            customer
        );
        return result;
    }
    async addUser(user: CreateUser): Promise<number> {
        const result = await this.userDataSource.createUser(
            user
        );
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