import { StaffDetail } from "../../../entities/staff-detail";

export interface GetStaffDetailUseCase {
	execute(staffId: number): Promise<StaffDetail | null>;
}
