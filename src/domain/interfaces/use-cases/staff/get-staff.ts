import { Staff } from "../../../entities/staff";

export interface GetStaffUseCase {
	execute(userId: number): Promise<Staff | null>;
}
