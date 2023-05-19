import { Admin } from "../../../entities/admin";

export interface AddAdminUseCase {
	execute(admin: Admin): Promise<number>;
}
