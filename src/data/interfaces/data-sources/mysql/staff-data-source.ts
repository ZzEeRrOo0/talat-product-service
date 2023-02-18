import { StaffModel } from "../../../data-sources/mysql/models/staff";

export interface StaffDataSource {
	createStaff(staff: StaffModel): Promise<number>;
}