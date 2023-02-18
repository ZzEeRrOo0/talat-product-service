import { Staff } from "../../../entities/staff";

export interface AddStaffUseCase {
	execute(staff: Staff): Promise<number>;
}
