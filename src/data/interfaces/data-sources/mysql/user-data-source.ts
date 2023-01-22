import { CreateCustomerJuristicPerson } from './../../../../domain/entities/create-customer-juristic-person';
import { CreateCustomerIndividual } from './../../../../domain/entities/create-customer-individual';
import { Request } from "express";
import { AllUser } from "../../../../domain/entities/all-users";
import { CreateCustomer } from "../../../../domain/entities/create-customer";
import { CreateUser } from "../../../../domain/entities/create-user";

export interface UserDataSource {
    getAll(currentPage: number, pageSize: number, req: Request): Promise<AllUser>;
    createUser(user: CreateUser): Promise<number>;
    createCustomer(customer: CreateCustomer): Promise<number>;
    createCustomerIndividual(customer: CreateCustomerIndividual): Promise<number>;
    createCustomerJuristicPerson(customer: CreateCustomerJuristicPerson): Promise<number>;
}