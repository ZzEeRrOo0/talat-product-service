import { Admin } from "../../entities/admin";

export interface AdminRepository {
	createAdmin(admin: Admin): Promise<number>;
	getAdminByUserId(userId: number): Promise<Admin | null>;
}
