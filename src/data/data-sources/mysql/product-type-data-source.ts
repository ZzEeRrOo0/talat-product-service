import { db } from "../../../../config/database";
import { ProductTypeDataSource } from "../../interfaces/data-sources/mysql/product-type";
import { ProductTypeModel } from "./models/product-type";

export class ProductTypeDataSourceImpl implements ProductTypeDataSource {
	getAllById(subCategoryId: string): Promise<ProductTypeModel[]> {
		const sql = `SELECT id,name_la AS name,sub_category_id FROM product_type WHERE sub_category_id = ${subCategoryId} AND deleted_at IS NULL`;

		return new Promise((resolve, reject) => {
			db.query(sql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const productType: ProductTypeModel[] = data.map(
					(e: { id: number; name: string; category_id: number }) =>
						new ProductTypeModel(e.id, e.name, e.category_id)
				);

				resolve(productType);
			});
		});
	}
}
