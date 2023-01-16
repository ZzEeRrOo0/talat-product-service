import express from "express";
import { Request, Response } from "express";
import { APIResponse } from '../../core/response/api-response';
import { GetAllUsersUseCase } from "../../domain/interfaces/use-cases/users/get-all-user";


export default function UserRouter(
    getAllUsersUseCase: GetAllUsersUseCase
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

    return router;
}