import { Customer } from "../../../../domain/entities/customer";

export class CustomerModel implements Customer {
	user_id: number;
	customer_type_id: number;

	constructor(
		$user_id: number,
		$customer_type_id: number
	) {
		this.user_id = $user_id;
		this.customer_type_id = $customer_type_id;
	}
}
