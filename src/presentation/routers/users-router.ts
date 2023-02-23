import express from "express";
import { Request, Response } from "express";
import { APIResponse } from "../../core/response/api-response";
import { AddRestaurantUseCase } from "../../domain/interfaces/use-cases/restaurant/add-restaurant";
import { AddRestaurantDetailUseCase } from "../../domain/interfaces/use-cases/restaurant/add-restaurant-detail";
import { AddCustomerUseCase } from "../../domain/interfaces/use-cases/users/add-customer";
import { AddCustomerIndividualUseCase } from "../../domain/interfaces/use-cases/users/add-customer-indiavidual";
import { AddCustomerJuristicPersonUseCase } from "../../domain/interfaces/use-cases/users/add-customer-juristic-person";
import { AddUserUseCase } from "../../domain/interfaces/use-cases/users/add-user";
import { GetAllUsersUseCase } from "../../domain/interfaces/use-cases/users/get-all-user";
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

export default function UserRouter(
	getAllUsersUseCase: GetAllUsersUseCase,
	addUserUseCase: AddUserUseCase,
	addCustomerUseCase: AddCustomerUseCase,
	addCustomerIndividualUseCase: AddCustomerIndividualUseCase,
	addCustomerJuristicPersonUseCase: AddCustomerJuristicPersonUseCase,
	addRestaurantUseCase: AddRestaurantUseCase,
	addRestaurantDetailUseCase: AddRestaurantDetailUseCase,
	getUserByPhoneNumberUseCase: GetUserByPhoneNumberUseCase,
	addStaffUseCase: AddStaffUseCase,
	addStaffDetailUseCase: AddStaffDetailUseCase
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
						res.send(
							new APIResponse(200, {
								is_exist: true,
								message: "This phone number already exist.",
							})
						);
					} else {
						res.send(
							new APIResponse(200, {
								is_exist: false,
								message: "Can use this phone number.",
							})
						);
					}
				} else {
					res.send(new APIResponse(400, { message: "Bad request" }));
				}
			} catch (err) {
				res.send(
					new APIResponse(500, { message: "Error fetching data" })
				);
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
				res.send(
					new APIResponse(201, { message: "Register success." })
				);
			} catch (err) {
				res.send(
					new APIResponse(500, { message: "Internal server error" })
				);
			}
		} else {
			res.send(new APIResponse(400, { message: "Bad request" }));
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
				const customerId = await addCustomerUseCase.execute(customer);
				if (req.body["owner_type_id"] == 1) {
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
				new APIResponse(500, { message: "Internal server error" });
			}
		} else {
			res.send(new APIResponse(400, { message: "Bad request" }));
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
		res.send(new APIResponse(201, { message: "Register success." }));
	}

	return router;
}

function verifyEmployeeRegisterForm(req: Request): boolean {
	if (
		req.body["full_name"] == undefined ||
		req.body["full_name"] == null ||
		req.body["full_name"] == "" ||
		req.body["date_of_birth"] == undefined ||
		req.body["date_of_birth"] == null ||
		req.body["gender"] == undefined ||
		req.body["gender"] == null ||
		req.body["province_id"] == undefined ||
		req.body["province_id"] == null ||
		req.body["district"] == undefined ||
		req.body["district"] == null ||
		req.body["district"] == "" ||
		req.body["village"] == undefined ||
		req.body["village"] == null ||
		req.body["village"] == "" ||
		req.body["phone"] == undefined ||
		req.body["phone"] == null ||
		req.body["phone"] == "" ||
		req.body["password"] == undefined ||
		req.body["password"] == null ||
		req.body["password"] == "" ||
		req.body["fb_uid"] == undefined ||
		req.body["fb_uid"] == null ||
		req.body["fb_uid"] == ""
	) {
		return false;
	}

	return true;
}

function verifyOwnerRegisterForm(req: Request): boolean {
	if (
		req.body["restaurant_name"] == undefined ||
		req.body["restaurant_name"] == null ||
		req.body["restaurant_name"] == "" ||
		req.body["restaurant_type_id"] == undefined ||
		req.body["restaurant_type_id"] == null ||
		req.body["restaurant_purchase_order_id"] == undefined ||
		req.body["restaurant_purchase_order_id"] == null ||
		req.body["restaurant_branch_id"] == undefined ||
		req.body["restaurant_branch_id"] == null ||
		req.body["location"] == undefined ||
		req.body["location"] == null ||
		req.body["location"] == "" ||
		req.body["owner_type_id"] == undefined ||
		req.body["owner_type_id"] == null ||
		req.body["phone"] == undefined ||
		req.body["phone"] == null ||
		req.body["phone"] == "" ||
		req.body["password"] == undefined ||
		req.body["password"] == null ||
		req.body["password"] == "" ||
		req.body["fb_uid"] == undefined ||
		req.body["fb_uid"] == null ||
		req.body["fb_uid"] == ""
	) {
		return false;
	}

	if (req.body["owner_type_id"] == "1") {
		if (
			req.body["full_name"] == undefined ||
			req.body["full_name"] == null ||
			req.body["full_name"] == "" ||
			req.body["id_card_number"] == undefined ||
			req.body["id_card_number"] == null ||
			req.body["id_card_number"] == "" ||
			req.body["address"] == undefined ||
			req.body["address"] == null ||
			req.body["address"] == ""
		) {
			return false;
		}
	} else {
		if (
			req.body["company_name"] == undefined ||
			req.body["company_name"] == null ||
			req.body["company_name"] == "" ||
			req.body["juristic_person_registration_number"] == undefined ||
			req.body["juristic_person_registration_number"] == null ||
			req.body["juristic_person_registration_number"] == "" ||
			req.body["registration_address"] == undefined ||
			req.body["registration_address"] == null ||
			req.body["registration_address"] == ""
		) {
			return false;
		}
	}

	return true;
}
