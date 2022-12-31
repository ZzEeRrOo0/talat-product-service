import { db } from "../../../../config/database";
import { CategoriesModel } from "./models/categories";
import { CategoriesDataSource } from "../../interfaces/data-sources/mysql/categories-data-source";

export class CategoriesDataSourceImpl implements CategoriesDataSource {
	getAll(): Promise<CategoriesModel[]> {
		const sql =
			"SELECT * FROM categories WHERE is_active = 1 AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(sql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const categories: CategoriesModel[] = data.map(
					(e: { id: number; name_la: string; image_url: string }) =>
						new CategoriesModel(e.id, e.name_la, e.image_url)
				);

				resolve(categories);
			});
		});
	}
}
