import express from "express";
import { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { GetUserByPhoneNumberAndPasswordFromUserDBUseCase } from "../../domain/interfaces/use-cases/users/get-user-by-phone-number-and-password-from-user-db";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { GetCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-customer";
import { GetIndividualCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-individual-customer";
import { GetJuristicPersonCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-juristic-person-customer";

export default function SignInRouter(
	getUserByPhoneNumberAndPasswordFromUserDBUseCase: GetUserByPhoneNumberAndPasswordFromUserDBUseCase,
	getCustomerUseCase: GetCustomerUseCase,
	getIndividualCustomerUseCase: GetIndividualCustomerUseCase,
	getJuristicPersonCustomerUseCase: GetJuristicPersonCustomerUseCase,
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.post("/", async (req: Request, res: Response) => {
		try {
			const phone = req.body["phone"];
			const password = req.body["password"];
			if (phone && password) {
				const user =
					await getUserByPhoneNumberAndPasswordFromUserDBUseCase.execute(
						phone,
						password
					);
				if (user != null) {
					const customer = await getCustomerUseCase.execute(user.id);
					if (customer != null) {
						if (customer.customer_type_id == 1) {
							const individualCustomer =
								await getIndividualCustomerUseCase.execute(
									customer.id!
								);

							if (individualCustomer != null) {
								jsonWebTokenService
									.generateToken(
										individualCustomer.full_name,
										phone
									)
									.then((userToken) => {
										res.send(
											new APIResponse(200, userToken)
										);
									})
									.catch((err) => {
										res.send(
											new APIResponse(401, {
												message: "Unauthorized.",
											})
										);
									});
							} else {
								res.send(
									new APIResponse(404, {
										message: "User not found",
									})
								);
							}
						} else {
							const juristicPersonCustomer =
								await getJuristicPersonCustomerUseCase.execute(
									customer.id!
								);

							if (juristicPersonCustomer != null) {
								jsonWebTokenService
									.generateToken(
										juristicPersonCustomer.company_name,
										phone
									)
									.then((userToken) => {
										res.send(
											new APIResponse(200, userToken)
										);
									})
									.catch((err) => {
										res.send(
											new APIResponse(401, {
												message: "Unauthorized.",
											})
										);
									});
							} else {
								res.send(
									new APIResponse(404, {
										message: "User not found",
									})
								);
							}
						}
					} else {
						res.send(
							new APIResponse(404, {
								message: "User not found",
							})
						);
					}
				} else {
					res.send(
						new APIResponse(404, {
							message: "User or password wrong",
						})
					);
				}
			} else {
				res.send(
					new APIResponse(400, {
						message: "Bad request.",
					})
				);
			}
		} catch (err) {
			res.send(new APIResponse(500, { message: "Error fetching data" }));
		}
	});

	return router;
}
