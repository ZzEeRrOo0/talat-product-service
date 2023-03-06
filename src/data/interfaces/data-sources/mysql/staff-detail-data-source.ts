import { StaffDetailModel } from "../../../data-sources/mysql/models/staff-detail";
import { StaffDetail } from "../../../../domain/entities/staff-detail";

export interface StaffDetailDataSource {
	createStaffDetail(staffDetail: StaffDetailModel): Promise<number>;
	getStaffDetailByUserId(userId: number): Promise<StaffDetail>;
}
