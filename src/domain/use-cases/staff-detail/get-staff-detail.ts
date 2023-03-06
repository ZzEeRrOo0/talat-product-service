import { StaffDetail } from "../../entities/staff-detail";
import { StaffDetailRepository } from "../../interfaces/repositories/staff-detail-repository";
import { GetStaffDetailUseCase } from "../../interfaces/use-cases/staff-detail/get-staff-detail";

export class GetStaffDetail implements GetStaffDetailUseCase {
	staffDetailRepository: StaffDetailRepository;

	constructor($staffDetailRepository: StaffDetailRepository) {
		this.staffDetailRepository = $staffDetailRepository;
	}

	async execute(userId: number): Promise<StaffDetail> {
		return await this.staffDetailRepository.getStaffDetail(userId);
	}
}
