import { Request } from "express";

export interface FindUserByQuery {
    whereSql(req: Request): String;
}

export class FindUserByQueryImpl implements FindUserByQuery {
    whereSql(req: Request): String {
        const query = req.query;
        const sql : string[] = [];

        sql.push("u.deleted_at IS NULL");

        if (sql.length > 1) {
            return sql.join(" AND ");
        }

        return sql.join("");
    }
}
