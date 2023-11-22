import { Request } from "express";

export interface FindProductByQuery {
	whereSql(req: Request): String;
}

export class FindProductByQueryImpl implements FindProductByQuery {
	whereSql(req: Request): String {
		const query = req.query;
		const sql: string[] = [];

		if (query.categoryId != undefined && query.categoryId != "") {
			sql.push(`p.category_id=${query.categoryId}`);
		}

		if (query.subCategoryId != undefined && query.subCategoryId != "") {
			sql.push(`p.sub_category_id=${query.subCategoryId}`);
		}

		if (query.productTypeId != undefined && query.productTypeId != "") {
			sql.push(`p.product_type_id=${query.productTypeId}`);
		}

		if (query.name != undefined && query.name != "") {
			sql.push(`p.name_la LIKE '%${query.name}%'`);
		}

		if (query.status != undefined) {
			sql.push(`p.status=${query.status}`);
		}

		sql.push("p.deleted_at IS NULL");

		if (sql.length > 1) {
			return sql.join(" AND ");
		}

		return sql.join("");
	}
}
