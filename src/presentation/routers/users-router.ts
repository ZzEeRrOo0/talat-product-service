import express from "express";
import { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { checkRegisterData } from "../../core/util/validate-data/validate-register-payload";
import { AddRestaurantUseCase } from "../../domain/interfaces/use-cases/restaurant/add-restaurant";
import { AddRestaurantDetailUseCase } from "../../domain/interfaces/use-cases/restaurant/add-restaurant-detail";
import { AddCustomerUseCase } from "../../domain/interfaces/use-cases/users/add-customer";
import { AddCustomerIndividualUseCase } from "../../domain/interfaces/use-cases/users/add-customer-indiavidual";
import { AddCustomerJuristicPersonUseCase } from "../../domain/interfaces/use-cases/users/add-customer-juristic-person";
import { AddUserUseCase } from "../../domain/interfaces/use-cases/users/add-user";
import { GetAllUsersUseCase } from "../../domain/interfaces/use-cases/users/get-all-user";

export default function UserRouter(
	getAllUsersUseCase: GetAllUsersUseCase,
	addUserUseCase: AddUserUseCase,
	addCustomerUseCase: AddCustomerUseCase,
	addCustomerIndividualUseCase: AddCustomerIndividualUseCase,
	addCustomerJuristicPersonUseCase: AddCustomerJuristicPersonUseCase,
	addRestaurantUseCase: AddRestaurantUseCase,
	addRestaurantDetailUseCase: AddRestaurantDetailUseCase
) {
	const router = express.Router();

	router.get("/", async (req: Request, res: Response) => {
		try {
			const currentPage = req.query["currentPage"]?.toString() ?? "1";
			const pageSize = req.query["pageSize"]?.toString() ?? "5";
			const users = await getAllUsersUseCase.execute(
				Number.parseInt(currentPage),
				Number.parseInt(pageSize),
				req
			);
			res.send(new APIResponse(200, users));
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	router.post("employee/register", async (req: Request, res: Response) => {});

	router.post("owner/register", async (req: Request, res: Response) => {});

	return router;
}
