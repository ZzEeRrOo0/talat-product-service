import { AdminDataSource } from "../../data/interfaces/data-sources/mysql/admjn-data-source";
import { Admin } from "../entities/admin";
import { AdminRepository } from "../interfaces/repositories/admin-repository";

export class AdminRepositoryImpl implements AdminRepository {
	adminDataSource: AdminDataSource;

	constructor($adminDataSource: AdminDataSource) {
		this.adminDataSource = $adminDataSource;
	}

	async createAdmin(admin: Admin): Promise<number> {
		return await this.adminDataSource.createAdmin(admin);
	}
	async getAdminByUserId(userId: number): Promise<Admin | null> {
		return await this.adminDataSource.getAdminByUserId(userId);
	}
}
