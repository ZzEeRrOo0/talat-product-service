import { StaffDetail } from "../../../entities/staff-detail";

export interface GetStaffDetailUseCase {
	execute(userId: number): Promise<StaffDetail>;
}
