import { AddAdminUseCase } from "../../interfaces/use-cases/admin/add-admin";
import { AdminRepository } from "../../interfaces/repositories/admin-repository";
import { Admin } from "../../entities/admin";

export class AddAdmin implements AddAdminUseCase {
	adminRepository: AdminRepository;

	constructor($adminRepository: AdminRepository) {
		this.adminRepository = $adminRepository;
	}

	async execute(admin: Admin): Promise<number> {
		return await this.adminRepository.createAdmin(admin);
	}
}
