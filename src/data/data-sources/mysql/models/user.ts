import { User } from "../../../../domain/entities/user";

export class UserModel implements User {
	id: number;
	user_type_id!: number;
	phone!: string;

	constructor(id: number, user_type_id: number, phone: string) {
		(this.id = id),
			(this.user_type_id = user_type_id),
			(this.phone = phone);
	}
}
