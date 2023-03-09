import { StaffDetail } from "../../../../domain/entities/staff-detail";

export interface StaffDetailDataSource {
	createStaffDetail(staffDetail: StaffDetail): Promise<number>;
	getStaffDetailByStaffId(staffId: number): Promise<StaffDetail | null>;
}
