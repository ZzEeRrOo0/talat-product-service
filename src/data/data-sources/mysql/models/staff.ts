import { Staff } from '../../../../domain/entities/staff';

export class StaffModel implements Staff {
	user_id: number;
	staff_role_id: number;

	constructor(
		$user_id: number,
		$staff_role_id: number
	) {
		this.user_id = $user_id;
		this.staff_role_id = $staff_role_id;
	}
}
