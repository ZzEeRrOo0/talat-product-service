import { Staff } from '../../../../domain/entities/staff';

export class StaffModel implements Staff {
	id?: number;
	user_id: number;
	staff_role_id: number;

	constructor(
		$user_id: number,
		$staff_role_id: number,
		$id?: number
	) {
		this.user_id = $user_id;
		this.staff_role_id = $staff_role_id;
		this.id = $id;
	}
}
