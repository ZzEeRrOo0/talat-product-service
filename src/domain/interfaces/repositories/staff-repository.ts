import { Staff } from "../../entities/staff";

export interface StaffRepository {
	addStaff(staff: Staff): Promise<number>;
	getStaff(userId: number): Promise<Staff | null>;
}