import { Request } from "express";
import { AllOrder } from "../../../entities/all-order";

export interface GetAllOrderUseCase {
	execute(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllOrder>;
}
