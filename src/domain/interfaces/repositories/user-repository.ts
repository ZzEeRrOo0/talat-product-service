import { CreateCustomerJuristicPerson } from './../../entities/create-customer-juristic-person';
import { CreateCustomerIndividual } from './../../entities/create-customer-individual';
import { AllUser } from "../../entities/all-users";
import { Request } from "express";
import { CreateUser } from "../../entities/create-user";
import { CreateCustomer } from "../../entities/create-customer";

export interface UserRepository {

    getUsers(
        currentPage: number,
        pageSize: number,
        req: Request
    ): Promise<AllUser>;

    addUser(user: CreateUser): Promise<number>;
    addCustomer(customer: CreateCustomer): Promise<number>;
    addCustomerIndividual(customer: CreateCustomerIndividual): Promise<number>;
    addCustomerJuristicPerson(customer: CreateCustomerJuristicPerson): Promise<number>;

}