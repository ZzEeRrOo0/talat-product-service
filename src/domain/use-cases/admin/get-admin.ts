import { AdminRepository } from "../../interfaces/repositories/admin-repository";
import { Admin } from "../../entities/admin";
import { GetAdminByUserIdUseCase } from "../../interfaces/use-cases/admin/get-admin";

export class GetAdminByUserId implements GetAdminByUserIdUseCase {
	adminRepository: AdminRepository;

	constructor($adminRepository: AdminRepository) {
		this.adminRepository = $adminRepository;
	}

	async execute(userId: number): Promise<Admin | null> {
		return await this.adminRepository.getAdminByUserId(userId);
	}
}
