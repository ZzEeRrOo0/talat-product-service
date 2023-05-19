import express, { Request, Response } from "express";
import { AddAdminUseCase } from "../../domain/interfaces/use-cases/admin/add-admin";
import { GetAdminByUserIdUseCase } from "../../domain/interfaces/use-cases/admin/get-admin";
import { AddUserUseCase } from "../../domain/interfaces/use-cases/users/add-user";
import { APIResponse } from "../../core/response/api-response";
import { UserRequest } from "../../domain/entities/user-request";
import { Admin } from "../../domain/entities/admin";

export default function AdminRouter(
	addUserUseCase: AddUserUseCase,
	addAdminUseCase: AddAdminUseCase
) {
	const router = express.Router();

	router.get("/list", (req: Request, res: Response) => {});

	router.post("/new", async (req: Request, res: Response) => {
		try {
			if (verifyAdminForm(req)) {
				const user = new UserRequest();
				user.fb_uid = req.body["fb_uid"];
				user.phone = req.body["phone"];
				user.password = req.body["password"];
				user.user_type_id = 1;
				const userId = await addUserUseCase.execute(user);
				const admin = new Admin();
				admin.full_name = req.body["full_name"];
				admin.role_id = req.body["role_id"];
				admin.user_id = userId;
				await addAdminUseCase.execute(admin);
				res.send(new APIResponse(201, { message: "Created success." }));
			} else {
				res.send(new APIResponse(400, { message: "Bad request" }));
			}
		} catch (e) {
			return res.send(
				new APIResponse(500, { message: "Internal server error" })
			);
		}
	});

	return router;
}

function verifyAdminForm(req: Request): boolean {
	const fields = ["full_name", "role_id", "phone", "password", "fb_uid"];

	return fields.every(
		(field) =>
			req.body[field] !== undefined &&
			req.body[field] !== null &&
			req.body[field] !== ""
	);
}
