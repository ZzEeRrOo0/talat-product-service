import { AllUserAdmin } from "../../../entities/all-user-admin";

export interface GetAllUserAdminUseCase {
	execute(currentPage: number, pageSize: number): Promise<AllUserAdmin>;
}
