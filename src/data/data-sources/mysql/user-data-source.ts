
import { user_db } from "../../../../config/database";
import { Pagination } from "../../../core/pagination";
import { FindUserByQuery } from "../../../core/util/mysql/find-user-by-query";
import { UserDataSource } from "../../interfaces/data-sources/mysql/user-data-source";
import { AllUserModel } from "./models/all-user";
import { Request } from "express";
import { UserModel } from "./models/user";


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
