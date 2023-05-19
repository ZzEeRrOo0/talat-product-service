import { Admin } from "../../../../domain/entities/admin";

export interface AdminDataSource {
	createAdmin(admin: Admin): Promise<number>;
	getAdminByUserId(userId: number): Promise<Admin | null>;
}
