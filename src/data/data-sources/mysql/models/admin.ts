import { Admin } from "../../../../domain/entities/admin";

export class AdminModel implements Admin {
	id: number | undefined;
	user_id: number;
	role_id: number;
	full_name: string;

	constructor(
		$user_id: number,
		$role_id: number,
		$full_name: string,
		$id?: number
	) {
		this.user_id = $user_id;
		this.role_id = $role_id;
		this.full_name = $full_name;
		this.id = $id;
	}
}
