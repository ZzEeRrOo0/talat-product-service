import { Staff } from "../entities/staff";
import { StaffRepository } from "../interfaces/repositories/staff-repository";
import { StaffDataSource } from "../../data/interfaces/data-sources/mysql/staff-data-source";
import { StaffModel } from "../../data/data-sources/mysql/models/staff";

export class StaffRepositoryImpl implements StaffRepository {
	staffDataSource: StaffDataSource;

	constructor($staffDataSource: StaffDataSource) {
		this.staffDataSource = $staffDataSource;
	}

	async addStaff(staff: Staff): Promise<number> {
		const staffInfo = new StaffModel(staff.user_id!, staff.staff_role_id);
		const result = await this.staffDataSource.createStaff(staffInfo);
		return result;
	}
}
