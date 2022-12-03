import { AllProduct } from "../../../entities/all-product";
import { Request } from "express";

export interface GetAllProductUseCase {
	execute(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllProduct>;
}
