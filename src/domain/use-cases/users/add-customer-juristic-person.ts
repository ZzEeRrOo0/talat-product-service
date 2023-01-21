import { CreateCustomerIndividual } from "../../entities/create-customer-individual"
import { CreateCustomerJuristicPerson } from "../../entities/create-customer-juristic-person"
import { UserRepository } from "../../interfaces/repositories/user-repository"
import { AddCustomerIndividualUseCase } from "../../interfaces/use-cases/users/add-customer-indiavidual"
import { AddCustomerJuristicPersonUseCase } from "../../interfaces/use-cases/users/add-customer-juristic-person"


export class AddCustomerJuristicPerson implements AddCustomerJuristicPersonUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(customer: CreateCustomerJuristicPerson): Promise<number> {
        const result = await this.userRepository.addCustomerJuristicPerson(customer)
        return result
    }
}