import { StaffDetailModel } from "../../../data-sources/mysql/models/staff-detail";

export interface StaffDetailDataSource {
	createStaffDetail(staffDetail: StaffDetailModel): Promise<number>;
}
