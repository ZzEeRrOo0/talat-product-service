import { StaffRepository } from '../../interfaces/repositories/staff-repository';
import { Staff } from "../../entities/staff";
import { GetStaffUseCase } from "../../interfaces/use-cases/staff/get-staff";

export class GetStaff implements GetStaffUseCase {
	staffRepository: StaffRepository;

	constructor($staffRepository: StaffRepository) {
		this.staffRepository = $staffRepository;
	}

	async execute(userId: number): Promise<Staff | null> {
		return await this.staffRepository.getStaff(userId);
	}
}
