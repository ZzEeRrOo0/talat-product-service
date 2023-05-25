import express from "express";
import { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { GetUserByPhoneNumberAndPasswordFromUserDBUseCase } from "../../domain/interfaces/use-cases/users/get-user-by-phone-number-and-password-from-user-db";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { GetCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-customer";
import { GetIndividualCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-individual-customer";
import { GetJuristicPersonCustomerUseCase } from "../../domain/interfaces/use-cases/customer/get-juristic-person-customer";
import { GetStaffUseCase } from "../../domain/interfaces/use-cases/staff/get-staff";
import { GetStaffDetailUseCase } from "../../domain/interfaces/use-cases/staff-detail/get-staff-detail";
import { GetAdminByUserIdUseCase } from "../../domain/interfaces/use-cases/admin/get-admin";

export default function SignInRouter(
	getUserByPhoneNumberAndPasswordFromUserDBUseCase: GetUserByPhoneNumberAndPasswordFromUserDBUseCase,
	getCustomerUseCase: GetCustomerUseCase,
	getIndividualCustomerUseCase: GetIndividualCustomerUseCase,
	getJuristicPersonCustomerUseCase: GetJuristicPersonCustomerUseCase,
	getStaffUseCase: GetStaffUseCase,
	getAdminByUserIdUseCase: GetAdminByUserIdUseCase,
	getStaffDetailUseCase: GetStaffDetailUseCase,
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
					if (user.user_type_id == 2) {
						const customer = await getCustomerUseCase.execute(
							user.id
						);
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
											const data = userToken;
											data.id = user.id;
											res.send(
												new APIResponse(200, data)
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
											const data = userToken;
											data.id = user.id;
											res.send(
												new APIResponse(200, data)
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
					} else if (user.user_type_id == 3) {
						const staff = await getStaffUseCase.execute(user.id);
						if (staff != null) {
							const staffDetail =
								await getStaffDetailUseCase.execute(staff.id!);
							jsonWebTokenService
								.generateToken(staffDetail!.full_name, phone)
								.then((userToken) => {
									const data = userToken;
									data.id = user.id;
									res.send(new APIResponse(200, data));
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
						res.send(
							new APIResponse(400, {
								message: "Bad Request.",
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

	router.post("/admin", async (req: Request, res: Response) => {
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
					if (user.user_type_id == 1) {
						const admin = await getAdminByUserIdUseCase.execute(
							user.id
						);
						if (admin != null) {
							jsonWebTokenService
								.generateToken(admin.full_name!, phone)
								.then((userToken) => {
									const ut = userToken;
									ut.id = user.id;
									const data = {
										access_token: ut.access_token,
										refresh_token: ut.refresh_token,
										user: {
											id: user.id,
											display_name: ut.display_name,
											user_type_id: user.user_type_id,
											role_id: admin.role_id,
										},
									};
									res.send(new APIResponse(200, data));
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
						res.send(
							new APIResponse(400, {
								message: "Bad Request.",
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
