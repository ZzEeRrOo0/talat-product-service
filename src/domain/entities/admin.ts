export class Admin {
	id?: number;
	user_id: number | undefined;
	role_id: number | undefined;
	full_name: string | undefined;

	constructor($user_id?: number, $role_id?: number, $full_name?: string) {
		this.user_id = $user_id;
		this.role_id = $role_id;
		this.full_name = $full_name;
	}
}
