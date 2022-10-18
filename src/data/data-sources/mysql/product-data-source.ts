import { ProductDataSource } from "../../interfaces/data-sources/mysql/product-data-source";
import { db } from "../../../../config/database";
import { ProductModel } from "./models/product";
import { OkPacket } from "mysql2";
import { ProductDetailModel } from "./models/product-detail";

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

		return new Promise((resolve, reject) => {
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

				resolve(products);
			});
		});
	}

	getAllByCategoryId(categoryId: string): Promise<ProductDetailModel[]> {
		const sql = `SELECT id,name,code,product_type_id,category_id,sub_category_id,(SELECT image_name FROM product_images WHERE product_id = id AND deleted_at IS NULL) AS image FROM products WHERE category_id = ${categoryId} AND deleted_at IS NULL`;

		return new Promise((resolve, reject) => {
			db.query(sql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const products: ProductDetailModel[] = data.map(
					(e: {
						id: number;
						name: String;
						code: String;
						image: String | undefined;
						product_type_id: number;
						category_id: number;
						sub_category_id: number | undefined;
					}) =>
						new ProductDetailModel(
							e.id,
							e.name,
							e.code,
							e.image,
							e.product_type_id,
							e.category_id,
							e.sub_category_id
						)
				);

				resolve(products);
			});
		});
	}

	getAllBySubCategoryId(subCategoryId: string): Promise<ProductDetailModel[]> {
		const sql = `SELECT id,name,code,product_type_id,category_id,sub_category_id,(SELECT image_name FROM product_images WHERE product_id = id AND deleted_at IS NULL) AS image FROM products WHERE sub_category_id = ${subCategoryId} AND deleted_at IS NULL`;

		return new Promise((resolve, reject) => {
			db.query(sql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const products: ProductDetailModel[] = data.map(
					(e: {
						id: number;
						name: String;
						code: String;
						image: String | undefined;
						product_type_id: number;
						category_id: number;
						sub_category_id: number | undefined;
					}) =>
						new ProductDetailModel(
							e.id,
							e.name,
							e.code,
							e.image,
							e.product_type_id,
							e.category_id,
							e.sub_category_id
						)
				);

				resolve(products);
			});
		});
	}
}
