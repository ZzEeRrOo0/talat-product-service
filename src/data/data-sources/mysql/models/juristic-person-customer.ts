import { JuristicPersonCustomer } from "../../../../domain/entities/juristic-person-customer";

export class JuristicPersonCustomerModel implements JuristicPersonCustomer {
	id?: number;
	customer_id: number;
	company_name: string;
	juristic_person_registration_number: string;
	registration_address: string;

	constructor(
		$customer_id: number,
		$company_name: string,
		$juristic_person_registration_number: string,
		$registration_address: string,
		$id?: number,
	) {
		this.customer_id = $customer_id;
		this.company_name = $company_name;
		this.juristic_person_registration_number =
			$juristic_person_registration_number;
		this.registration_address = $registration_address;
		this.id = $id;
	}
}
