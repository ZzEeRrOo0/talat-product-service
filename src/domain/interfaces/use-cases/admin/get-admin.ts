import { Admin } from "../../../entities/admin";

export interface GetAdminByUserIdUseCase {
	execute(userId: number): Promise<Admin | null>;
}
