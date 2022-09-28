import { ProductDataSource } from "../../interfaces/data-sources/mysql/product-data-source";
import { db } from "../../../../config/database";
import { ProductModel } from "./models/product";
import { OkPacket } from "mysql2";

export class ProductDataSourceImpl implements ProductDataSource {
	create(product: ProductModel): Promise<number> {
		const sql =
			"INSERT INTO products (name, code, product_type_id, category_id, sub_category_id) VALUES(?, ?, ?, ?, ?)";

		return new Promise((resolve, reject) => {
			db.query(
				sql,
				[
					product.name,
					product.code,
					product.productTypeId,
					product.categoryId,
					product.subCategoryId,
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

	getAll(): Promise<ProductModel[]> {
		const sql = "SELECT * FROM products WHERE deleted_at IS NULL";

		return new Promise((reslove, reject) => {
			db.query(sql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const products: ProductModel[] = data.map(
					(e: {
						id: number;
						name: String;
						code: String;
						product_type_id: number;
						category_id: number;
						sub_category_id: number | undefined;
					}) =>
						new ProductModel(
							e.id,
							e.name,
							e.code,
							e.product_type_id,
							e.category_id,
							e.sub_category_id
						)
				);

				reslove(products);
			});
		});
	}
}
