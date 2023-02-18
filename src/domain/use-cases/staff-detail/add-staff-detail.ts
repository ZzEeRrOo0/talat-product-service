import { StaffDetail } from "../../entities/staff-detail";
import { StaffDetailRepository } from "../../interfaces/repositories/staff-detail-repository";
import { AddStaffDetailUseCase } from "../../interfaces/use-cases/staff-detail/add-staff-detail";

export class AddStaffDetail implements AddStaffDetailUseCase {
	staffDetailRepository: StaffDetailRepository;

	constructor($staffDetailRepository: StaffDetailRepository) {
		this.staffDetailRepository = $staffDetailRepository;
	}

	async execute(staffDetail: StaffDetail): Promise<number> {
		return await this.staffDetailRepository.addStaffDetail(staffDetail);
	}
}
