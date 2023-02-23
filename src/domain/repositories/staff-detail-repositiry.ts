import { StaffDetail } from "../entities/staff-detail";
import { StaffDetailRepository } from "../interfaces/repositories/staff-detail-repository";
import { StaffDetailDataSource } from "../../data/interfaces/data-sources/mysql/staff-detail-data-source";
import { StaffDetailModel } from "../../data/data-sources/mysql/models/staff-detail";

export class StaffDetailRepositoryImpl implements StaffDetailRepository {
	staffDetailDataSource: StaffDetailDataSource;

	constructor($staffDetailDataSource: StaffDetailDataSource) {
		this.staffDetailDataSource = $staffDetailDataSource;
	}

	async addStaffDetail(staffDetail: StaffDetail): Promise<number> {
		const staffDetailInfo = new StaffDetailModel(
			staffDetail.staff_id!,
			staffDetail.full_name,
			staffDetail.date_of_birth!,
			staffDetail.gender!,
			staffDetail.province_id!,
			staffDetail.district,
			staffDetail.village
		);
		const result = await this.staffDetailDataSource.createStaffDetail(
			staffDetailInfo
		);
		return result;
	}
}
