import { StaffDetail } from "../../entities/staff-detail";

export interface StaffDetailRepository {
	addStaffDetail(staffDetail: StaffDetail): Promise<number>;
	getStaffDetail(userId: number) : Promise<StaffDetail | null>;
}