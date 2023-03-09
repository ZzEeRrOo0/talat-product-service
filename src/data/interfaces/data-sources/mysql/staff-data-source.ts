import { Staff } from "../../../../domain/entities/staff";

export interface StaffDataSource {
	createStaff(staff: Staff): Promise<number>;
	getStaffByUserId(userId: number): Promise<Staff | null>;
}
