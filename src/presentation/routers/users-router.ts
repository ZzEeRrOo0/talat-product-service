import express from "express";
import { Request, Response } from "express";
import { AddRestaurantUseCase } from "../../domain/interfaces/use-cases/restaurant/add-restaurant";
import { AddRestaurantDetailUseCase } from "../../domain/interfaces/use-cases/restaurant/add-restaurant-detail";
import { AddCustomerUseCase } from "../../domain/interfaces/use-cases/users/add-customer";
import { AddCustomerIndividualUseCase } from "../../domain/interfaces/use-cases/users/add-customer-indiavidual";
import { AddCustomerJuristicPersonUseCase } from "../../domain/interfaces/use-cases/users/add-customer-juristic-person";
import { AddUserUseCase } from "../../domain/interfaces/use-cases/users/add-user";
import { GetUserByPhoneNumberUseCase } from "../../domain/interfaces/use-cases/users/get-user-by-phone-number";
import { UserRequest } from "../../domain/entities/user-request";
import { Customer } from "../../domain/entities/customer";
import { IndividualCustomer } from "../../domain/entities/individual-customer";
import { JuristicPersonCustomer } from "../../domain/entities/juristic-person-customer";
import { RestaurantDetail } from "../../domain/entities/restaurant-detail";
import { AddStaffUseCase } from "../../domain/interfaces/use-cases/staff/add-staff";
import { AddStaffDetailUseCase } from "../../domain/interfaces/use-cases/staff-detail/add-staff-detail";
import { Staff } from "../../domain/entities/staff";
import { StaffDetail } from "../../domain/entities/staff-detail";
import { sendResponse } from "../../core/response/api-response";
import { JsonWebTokenService } from "../../core/util/jwt/jwt-token";
import { decrypt } from "../../core/util/authentication/decryption";
import { GetAllCustomerIndividualUseCase } from "../../domain/interfaces/use-cases/users/get-all-cusromer-individual";
import { GetAllCustomerJuristicPersonUseCase } from "../../domain/interfaces/use-cases/users/get-all-customer-juristic-person";
import { GetAllUserAdminUseCase } from "../../domain/interfaces/use-cases/users/get-all-user-admin";
import { ResetPasswordUseCase } from "../../domain/interfaces/use-cases/users/reset-password";
import { GetUserByPhoneNumberAndPasswordFromUserDBUseCase } from "../../domain/interfaces/use-cases/users/get-user-by-phone-number-and-password-from-user-db";
import { SMSService } from "../../core/util/twilio/sms";

export default function UserRouter(
	addUserUseCase: AddUserUseCase,
	addCustomerUseCase: AddCustomerUseCase,
	addCustomerIndividualUseCase: AddCustomerIndividualUseCase,
	addCustomerJuristicPersonUseCase: AddCustomerJuristicPersonUseCase,
	addRestaurantUseCase: AddRestaurantUseCase,
	addRestaurantDetailUseCase: AddRestaurantDetailUseCase,
	getUserByPhoneNumberUseCase: GetUserByPhoneNumberUseCase,
	addStaffUseCase: AddStaffUseCase,
	addStaffDetailUseCase: AddStaffDetailUseCase,
	getAllCustomerIndividualUseCase: GetAllCustomerIndividualUseCase,
	getAllCustomerJuristicPersonUseCase: GetAllCustomerJuristicPersonUseCase,
	getAllUserAdminUseCase: GetAllUserAdminUseCase,
	getUserByPhoneNumberAndPasswordFromUserDBUseCase: GetUserByPhoneNumberAndPasswordFromUserDBUseCase,
	resetPasswordUseCase: ResetPasswordUseCase,
	smsService: SMSService,
	jsonWebTokenService: JsonWebTokenService
) {
	const router = express.Router();

	router.get(
		"/customers/owner",
		jsonWebTokenService.verifyAccessToken,
		async (req: Request, res: Response) => {
			try {
				const currentPage = req.query["currentPage"]?.toString() ?? "1";
				const pageSize = req.query["pageSize"]?.toString() ?? "5";
				const customerType =
					req.query["customerType"]?.toString() ?? "1";
				const userTypeId = decrypt(
					req.headers["x-user-type-id"]?.toString() ?? ""
				);
				if (userTypeId == "1") {
					if (customerType == "1") {
						const individualCustomers =
							await getAllCustomerIndividualUseCase.execute(
								Number.parseInt(currentPage),
								Number.parseInt(pageSize)
							);
						sendResponse(res, 200, individualCustomers);
					} else if (customerType == "2") {
						const juristicPersonCustomers =
							await getAllCustomerJuristicPersonUseCase.execute(
								Number.parseInt(currentPage),
								Number.parseInt(pageSize)
							);
						sendResponse(res, 200, juristicPersonCustomers);
					} else {
						sendResponse(res, 400, {
							message: "Bad request.",
						});
					}
				} else {
					sendResponse(res, 400, {
						message: "Bad request.",
					});
				}
			} catch (err) {
				sendResponse(res, 500, { message: "Error fetching data" });
			}
		}
	);

	router.get(
		"/admin",
		jsonWebTokenService.verifyAccessToken,
		async (req: Request, res: Response) => {
			try {
				const currentPage = req.query["currentPage"]?.toString() ?? "1";
				const pageSize = req.query["pageSize"]?.toString() ?? "5";
				const userTypeId = decrypt(
					req.headers["x-user-type-id"]?.toString() ?? ""
				);
				if (userTypeId == "1") {
					const userAdmins = await getAllUserAdminUseCase.execute(
						Number.parseInt(currentPage),
						Number.parseInt(pageSize)
					);
					sendResponse(res, 200, userAdmins);
				} else {
					sendResponse(res, 400, {
						message: "Bad request.",
					});
				}
			} catch (err) {
				sendResponse(res, 500, { message: "Error fetching data" });
			}
		}
	);

	router.post(
		"/check/is-exist-phone-number",
		async (req: Request, res: Response) => {
			try {
				if (req.body.phone != null) {
					const isExistUserPhoneNumber =
						await getUserByPhoneNumberUseCase.execute(
							req.body.phone
						);
					if (isExistUserPhoneNumber) {
						sendResponse(res, 200, {
							is_exist: true,
							message: "This phone number already exist.",
						});
					} else {
						sendResponse(res, 200, {
							is_exist: false,
							message: "Can use this phone number.",
						});
					}
				} else {
					sendResponse(res, 400, { message: "Bad request" });
				}
			} catch (err) {
				sendResponse(res, 500, { message: "Error fetching data" });
			}
		}
	);

	router.post("/employee/register", async (req: Request, res: Response) => {
		if (verifyEmployeeRegisterForm(req)) {
			try {
				const user = new UserRequest();
				user.fb_uid = req.body["fb_uid"];
				user.phone = req.body["phone"];
				user.password = req.body["password"];
				user.user_type_id = 4;
				const userId = await addUserUseCase.execute(user);
				const staff = new Staff();
				staff.user_id = userId;
				const staffId = await addStaffUseCase.execute(staff);
				const staffDetail = new StaffDetail();
				staffDetail.staff_id = staffId;
				staffDetail.full_name = req.body["full_name"];
				staffDetail.date_of_birth = new Date(req.body["date_of_birth"]);
				staffDetail.gender = req.body["gender"];
				staffDetail.province_id = req.body["province_id"];
				staffDetail.district = req.body["district"];
				staffDetail.village = req.body["village"];
				await addStaffDetailUseCase.execute(staffDetail);
				sendResponse(res, 201, { message: "Register success." });
			} catch (err) {
				sendResponse(res, 500, { message: "Internal server error" });
			}
		} else {
			sendResponse(res, 400, { message: "Bad request" });
		}
	});

	router.post("/owner/register", async (req: Request, res: Response) => {
		if (verifyOwnerRegisterForm(req)) {
			try {
				const user = new UserRequest();
				user.fb_uid = req.body["fb_uid"];
				user.phone = req.body["phone"];
				user.password = req.body["password"];
				const userId = await addUserUseCase.execute(user);
				const customer = new Customer();
				customer.user_id = userId;
				if (req.body["owner_type_id"] == 1) {
					customer.customer_type_id = 1;
					const customerId = await addCustomerUseCase.execute(
						customer
					);
					const individualCustomer = new IndividualCustomer();
					individualCustomer.customer_id = customerId;
					individualCustomer.full_name = req.body["full_name"];
					individualCustomer.id_card_number =
						req.body["id_card_number"];
					individualCustomer.address = req.body["address"];
					await addCustomerIndividualUseCase.execute(
						individualCustomer
					);
					const restaurantId = await addRestaurantUseCase.execute(
						customerId
					);
					addRestaurantDetail(req, res, restaurantId);
				} else {
					customer.customer_type_id = 2;
					const customerId = await addCustomerUseCase.execute(
						customer
					);
					const juristicPersonCustomer = new JuristicPersonCustomer();
					juristicPersonCustomer.customer_id = customerId;
					juristicPersonCustomer.company_name =
						req.body["company_name"];
					juristicPersonCustomer.juristic_person_registration_number =
						req.body["juristic_person_registration_number"];
					juristicPersonCustomer.registration_address =
						req.body["registration_address"];
					await addCustomerJuristicPersonUseCase.execute(
						juristicPersonCustomer
					);
					const restaurantId = await addRestaurantUseCase.execute(
						customerId
					);
					addRestaurantDetail(req, res, restaurantId);
				}
			} catch (e) {
				sendResponse(res, 500, { message: "Internal server error" });
			}
		} else {
			sendResponse(res, 400, { message: "Bad request" });
		}
	});

	router.post(
		"/reset-password",
		jsonWebTokenService.verifyAccessToken,
		async (req: Request, res: Response) => {
			try {
				const currentPassword = req.body["password"];
				const newPassword = req.body["new_password"];
				if (currentPassword && newPassword) {
					const user =
						await getUserByPhoneNumberAndPasswordFromUserDBUseCase.execute(
							res.locals.phone,
							currentPassword
						);
					if (user) {
						const isUpdated = await resetPasswordUseCase.execute(
							user.phone,
							newPassword
						);

						if (isUpdated) {
							sendResponse(res, 200, {
								message: "Reset password success.",
							});
						} else {
							sendResponse(res, 500, {
								message: "Reset password fialed.",
							});
						}
					} else {
						sendResponse(res, 400, {
							message: "Your current password wrong.",
						});
					}
				} else {
					sendResponse(res, 400, { message: "Bad request." });
				}
			} catch (err) {
				sendResponse(res, 500, { message: "Internal server error" });
			}
		}
	);

	router.post("/forgot-password", async (req: Request, res: Response) => {
		try {
			const phone = req.body["phone"];
			if (phone) {
				const password = Math.floor(
					10000000 + Math.random() * 90000000
				).toString();
				const isUpdated = await resetPasswordUseCase.execute(
					phone,
					password
				);
				if (isUpdated) {
					const message = `ຈາກ TaLat ລະຫັດຜ່ານໃໝ່ຂອງທ່ານແມ່ນ: ${password}`;
					smsService.sendMessage(message, `+85620${phone}`);
					sendResponse(res, 200, {
						message: "Reset password success",
					});
				} else {
					sendResponse(res, 500, {
						message: "Internal server error",
					});
				}
			} else {
				sendResponse(res, 400, { message: "Bad request." });
			}
		} catch (err) {
			sendResponse(res, 500, { message: "Internal server error" });
		}
	});

	async function addRestaurantDetail(
		req: Request,
		res: Response,
		restaurantID: number
	) {
		const restuarantDetail = new RestaurantDetail();
		restuarantDetail.name = req.body["restaurant_name"];
		restuarantDetail.restaurant_id = restaurantID;
		restuarantDetail.restaurant_type_id = req.body["restaurant_type_id"];
		restuarantDetail.restaurant_branch_id =
			req.body["restaurant_branch_id"];
		restuarantDetail.restaurant_purchase_order_id =
			req.body["restaurant_purchase_order_id"];
		restuarantDetail.location = req.body["location"];
		await addRestaurantDetailUseCase.execute(restuarantDetail);
		sendResponse(res, 201, { message: "Register success." });
	}

	return router;
}

function verifyEmployeeRegisterForm(req: Request): boolean {
	const fields = [
		"full_name",
		"date_of_birth",
		"gender",
		"province_id",
		"district",
		"village",
		"phone",
		"password",
		"fb_uid",
	];

	return fields.every(
		(field) =>
			req.body[field] !== undefined &&
			req.body[field] !== null &&
			req.body[field] !== ""
	);
}

function verifyOwnerRegisterForm(req: Request): boolean {
	const fields = [
		"restaurant_name",
		"restaurant_type_id",
		"restaurant_purchase_order_id",
		"restaurant_branch_id",
		"location",
		"owner_type_id",
		"phone",
		"password",
		"fb_uid",
	];

	if (
		fields.some(
			(field) =>
				req.body[field] === undefined ||
				req.body[field] === null ||
				req.body[field] === ""
		)
	) {
		return false;
	}

	if (req.body["owner_type_id"] == "1") {
		const ownerFields = ["full_name", "id_card_number", "address"];

		return ownerFields.every(
			(field) =>
				req.body[field] !== undefined &&
				req.body[field] !== null &&
				req.body[field] !== ""
		);
	} else {
		const companyFields = [
			"company_name",
			"juristic_person_registration_number",
			"registration_address",
		];

		return companyFields.every(
			(field) =>
				req.body[field] !== undefined &&
				req.body[field] !== null &&
				req.body[field] !== ""
		);
	}
}
