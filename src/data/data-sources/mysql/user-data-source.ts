import { user_db } from "../../../../config/database";
import { Pagination } from "../../../core/pagination";
import { FindUserByQuery } from "../../../core/util/mysql/find-user-by-query";
import { UserDataSource } from "../../interfaces/data-sources/mysql/user-data-source";
import { AllUserModel } from "./models/all-user";
import { Request } from "express";
import { UserModel } from "./models/user";
import { OkPacket, RowDataPacket } from "mysql2";
import { JuristicPersonCustomerModel } from "./models/juristic-person-customer";
import { IndividualCustomerModel } from "./models/individual-customer";
import { CustomerModel } from "./models/customer";
import { UserRequestModel } from "./models/user-request";
import { AuthenticationService } from "../../../core/util/authentication/index";

export class UserDataSourceImpl implements UserDataSource {
	paginationService: Pagination;
	findUserByQuery: FindUserByQuery;
	authenticationService: AuthenticationService;

	constructor(
		$paginationService: Pagination,
		$findUserByQuery: FindUserByQuery,
		$authenticationService: AuthenticationService
	) {
		this.paginationService = $paginationService;
		this.findUserByQuery = $findUserByQuery;
		this.authenticationService = $authenticationService;
	}

	getUserByPhoneNumberAndVerifyPassword(
		phone: string,
		password: string
	): Promise<boolean> {
		const sql = "SELECT * FROM users WHERE phone=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [phone], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = <RowDataPacket>result;

				if (data.length > 0) {
					this.authenticationService
						.decryptPassword(password, data[0]["password"])
						.then((isVerify) => {
							resolve(isVerify);
						})
						.catch((error) => {
							resolve(error);
						});
				} else {
					resolve(false);
				}
			});
		});
	}

	getUserByPhoneNumber(phone: string): Promise<boolean> {
		const sql = "SELECT * FROM users WHERE phone=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [phone], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = <RowDataPacket>result;

				if (data.length > 0) {
					resolve(true);
				} else {
					reject(false);
				}
			});
		});
	}

	createJuristicPersonCustomer(
		juristicPersonCustomer: JuristicPersonCustomerModel
	): Promise<number> {
		const sql =
			"INSERT INTO customer_juristic_person ( customer_id,company_name, juristic_person_registration_number,registration_address) VALUES(?, ?, ?,?)";

		return new Promise((resolve, reject) => {
			user_db.query(
				sql,
				[
					juristicPersonCustomer.customer_id,
					juristicPersonCustomer.company_name,
					juristicPersonCustomer.juristic_person_registration_number,
					juristicPersonCustomer.registration_address,
				],
				(error, result) => {
					if (error) {
						throw new Error("Internal server error.");
					}
					const insertId = (<OkPacket>result).insertId;
					resolve(insertId);
				}
			);
		});
	}
	createIndividualCustomer(
		individualCustomer: IndividualCustomerModel
	): Promise<number> {
		const sql =
			"INSERT INTO customer_individual (customer_id, full_name, id_card_number , address) VALUES(?, ?, ?,?)";

		return new Promise((resolve, reject) => {
			user_db.query(
				sql,
				[
					individualCustomer.customer_id,
					individualCustomer.full_name,
					individualCustomer.id_card_number,
					individualCustomer.address,
				],
				(error, result) => {
					if (error) {
						throw new Error("Internal server error.");
					}
					const insertId = (<OkPacket>result).insertId;
					resolve(insertId);
				}
			);
		});
	}

	createCustomer(customer: CustomerModel): Promise<number> {
		const sql =
			"INSERT INTO customers ( user_id, customer_type_id) VALUES(?, ?)";

		return new Promise((resolve, reject) => {
			user_db.query(
				sql,
				[customer.user_id, customer.customer_type_id],
				(error, result) => {
					if (error) {
						throw new Error("Internal server error.");
					}
					const insertId = (<OkPacket>result).insertId;
					resolve(insertId);
				}
			);
		});
	}

	createUser(user: UserRequestModel): Promise<number> {
		const sql =
			"INSERT INTO users (fb_uid, password, phone, user_type_id) VALUES(?, ?, ?, ?)";

		return new Promise((resolve, reject) => {
			this.authenticationService
				.encryptPassword(user.password)
				.then((password) => {
					user_db.query(
						sql,
						[user.fb_uid, password, user.phone, user.user_type_id],
						(error, result) => {
							if (error) {
								// throw new Error("Internal server error.");
								console.log(error);
							}
							const insertId = (<OkPacket>result).insertId;
							resolve(insertId);
						}
					);
				})
				.catch((error) => {
					throw new Error(error);
				});
		});
	}

	getAll(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllUserModel> {
		const getTotalItemSql =
			"SELECT COUNT(*) AS total FROM users WHERE deleted_at IS NULL";
		const getUsersSql =
			"SELECT u.id,CONCAT(u.firstname,' ',u.lastname) AS full_name,u.gender,u.phone,u.user_type_id,ut.name AS user_type_name " +
			"FROM users AS u " +
			"LEFT JOIN user_type AS ut ON ut.id = u.user_type_id " +
			`WHERE ${this.findUserByQuery.whereSql(req)} LIMIT ? OFFSET ?`;

		return new Promise((resolve, reject) => {
			user_db.query(getTotalItemSql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const paginate = this.paginationService.paginate(
					data[0].total,
					currentPage,
					pageSize,
					20
				);

				user_db.query(
					getUsersSql,
					[paginate.pageSize, paginate.startIndex],
					(pError, pResult) => {
						if (pError) {
							throw new Error("Internal server error.");
						}

						const data = JSON.parse(JSON.stringify(pResult));

						const users: UserModel[] = data.map(
							(e: {
								id: number;
								user_type_id: number;
								full_name: string;
								gender: string;
								user_type_name: string;
								phone: string;
							}) =>
								new UserModel(
									e.id,
									e.user_type_id,
									e.full_name,
									e.gender,
									e.user_type_name,
									e.phone
								)
						);

						const allUserResponse = new AllUserModel(
							users,
							paginate
						);

						resolve(allUserResponse);
					}
				);
			});
		});
	}
}
