import { Request } from "express";

export interface FindProductByQuery {
	whereSql(req: Request): String;
}

export class FindProductByQueryImpl implements FindProductByQuery {
	whereSql(req: Request): String {
		const query = req.query;
		const sql = [];

		if (query.categoryId != undefined) {
			sql.push(`p.category_id=${query.categoryId}`);
		}

		if (query.subCategoryId != undefined) {
			sql.push(`p.sub_category_id=${query.subCategoryId}`);
		}

		if (query.productTypeId != undefined) {
			sql.push(`p.product_type_id=${query.productTypeId}`);
		}

		sql.push("p.deleted_at IS NULL");

		if (sql.length > 1) {
			return sql.join(" AND ");
		}

		return sql.join("");
	}
}
