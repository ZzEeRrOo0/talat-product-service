import { Staff } from "../../entities/staff";
import { StaffRepository } from "../../interfaces/repositories/staff-repository";
import { AddStaffUseCase } from "../../interfaces/use-cases/staff/add-staff";

export class AddStaff implements AddStaffUseCase {
	staffRepository: StaffRepository;

	constructor($staffRepository: StaffRepository) {
		this.staffRepository = $staffRepository;
	}

	async execute(staff: Staff): Promise<number> {
		return await this.staffRepository.addStaff(staff);
	}
}
