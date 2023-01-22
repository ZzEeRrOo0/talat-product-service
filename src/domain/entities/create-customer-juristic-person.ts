export class CreateCustomerJuristicPerson {
    customer_id: number;
    company_name: string;
    juristic_person_registration_number: number;
    registration_address: string;

    constructor(
        customer_id: number,
        company_name: string,
        juristic_person_registration_number: number,
        registration_address: string,
    ) {
        this.customer_id = customer_id;
        this.company_name = company_name;
        this.juristic_person_registration_number = juristic_person_registration_number;
        this.registration_address = registration_address;
    }
} 