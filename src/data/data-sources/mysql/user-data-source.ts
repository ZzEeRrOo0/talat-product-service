
import { user_db } from "../../../../config/database";
import { Pagination } from "../../../core/pagination";
import { FindUserByQuery } from "../../../core/util/mysql/find-user-by-query";
import { UserDataSource } from "../../interfaces/data-sources/mysql/user-data-source";
import { AllUserModel } from "./models/all-user";
import { OkPacket } from "mysql2";
import { Request } from "express";
import { UserModel } from "./models/user";
import { CreateUser } from "../../../domain/entities/create-user";
import { CreateCustomer } from "../../../domain/entities/create-customer";
import { CreateCustomerIndividual } from "../../../domain/entities/create-customer-individual";
import { CreateCustomerJuristicPerson } from "../../../domain/entities/create-customer-juristic-person";


export class UserDataSourceImpl implements UserDataSource {
    paginationService: Pagination;
    findUserByQuery: FindUserByQuery;

    constructor(
        $paginationService: Pagination,
        $findUserByQuery: FindUserByQuery
    ) {
        this.paginationService = $paginationService;
        this.findUserByQuery = $findUserByQuery;
    }
    createCustomerJuristicPerson(customer: CreateCustomerJuristicPerson): Promise<number> {
        const sql =
            "INSERT INTO customer_juristic_person ( customer_id,company_name, juristic_person_registration_number,registration_address) VALUES(?, ?, ?,?)";

        return new Promise((resolve, reject) => {
            user_db.query(
                sql,
                [
                    customer.customer_id,
                    customer.company_name,
                    customer.juristic_person_registration_number,
                    customer.registration_address,
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
    createCustomerIndividual(customer: CreateCustomerIndividual): Promise<number> {
        const sql =
            "INSERT INTO customer_individual ( customer_id,full_name, id_card_number,address) VALUES(?, ?, ?,?)";

        return new Promise((resolve, reject) => {
            user_db.query(
                sql,
                [
                    customer.customer_id,
                    customer.full_name,
                    customer.id_card_number,
                    customer.address,
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

    createCustomer(customer: CreateCustomer): Promise<number> {
        const sql =
            "INSERT INTO customers ( user_id,customer_type_id, customer_receipt_and_tax_invoice_id) VALUES(?, ?, ?)";

        return new Promise((resolve, reject) => {
            user_db.query(
                sql,
                [
                    customer.user_id,
                    customer.customer_type_id,
                    customer.customer_receipt_and_tax_invoice_id,
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

    createUser(user: CreateUser): Promise<number> {
        const sql =
            "INSERT INTO users (fb_uid, firstname, lastname, date_of_birth, gender,phone,user_type_id,village_id,district_id,province_id ) VALUES(?, ?, ?, ?, ?,?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            user_db.query(
                sql,
                [
                    user.fb_uid,
                    user.firstname,
                    user.lastname,
                    user.date_of_birth,
                    user.gender,
                    user.phone,
                    user.user_type_id,
                    user.village_id,
                    user.district_id,
                    user.province_id,
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
                                id: number,
                                user_type_id: number,
                                full_name: string,
                                gender: string,
                                user_type_name: string,
                                phone: string,
                            }) =>
                                new UserModel(
                                    e.id,
                                    e.user_type_id,
                                    e.full_name,
                                    e.gender,
                                    e.user_type_name,
                                    e.phone,
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
