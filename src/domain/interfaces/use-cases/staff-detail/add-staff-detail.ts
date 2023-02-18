import { StaffDetail } from "../../../entities/staff-detail";

export interface AddStaffDetailUseCase {
	execute(staffDetail: StaffDetail): Promise<number>;
}
