import express from "express";
import { Request, Response } from "express";
import { APIResponse } from '../../core/response/api-response';
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
    addRestaurantDetailUseCase: AddRestaurantDetailUseCase,
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

    router.post("/register", async (req: Request, res: Response) => {
        try {
            //TODO check body and haldle bad request
            const userID = await addUserUseCase.execute(req.body);
            //TODO finish the remaining usecase
            // await addCustomerUseCase.execute({
            //     productId: productID,
            //     ...req.body,
            // });
            res.send(
                new APIResponse(200, {
                    message: "Created User Successfully",
                })
            );
        } catch (err) {
            res.send(new APIResponse(500, { message: "Error saving data" }));
        }
    });

    return router;
}