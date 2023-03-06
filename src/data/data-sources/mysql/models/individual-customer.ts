import { IndividualCustomer } from "../../../../domain/entities/individual-customer";

export class IndividualCustomerModel implements IndividualCustomer {
	id?: number;
	customer_id: number;
	full_name: string;
	id_card_number: string;
	address: string;

	constructor(
		$customer_id: number,
		$full_name: string,
		$id_card_number: string,
		$address: string,
		$id?: number
	) {
		this.customer_id = $customer_id;
		this.full_name = $full_name;
		this.id_card_number = $id_card_number;
		this.address = $address;
		this.id = $id;
	}
}
