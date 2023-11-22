import { db } from "../../../../config/database";
import { ProductImage } from "../../../domain/entities/product-image";
import { SubCategoryDataSource } from "../../interfaces/data-sources/mysql/sub-category-data-source";
import { SubCategoryModel } from "./models/sub-category";
import { OkPacket } from "mysql2";

export class SubCategoryDataSourceImpl implements SubCategoryDataSource {
	addSubCategoryImage(productImage: ProductImage): Promise<string> {
		const sql = "UPDATE sub_categories SET image_url = ? WHERE id= ?";

		return new Promise((resolve, reject) => {
			db.query(
				sql,
				[productImage.imagePath, productImage.productID],
				(error, result) => {
					if (error) {
						throw new Error("Internal server error.");
					}
					const insertId = (<OkPacket>result).insertId;
					resolve(insertId.toString());
				}
			);
		});
	}
	getAllByCategoryId(categoryId: string): Promise<SubCategoryModel[]> {
		const sql = `SELECT id, name_la AS name,category_id, image_url FROM sub_categories WHERE category_id = ${categoryId} AND deleted_at IS NULL`;

		return new Promise((resolve, reject) => {
			db.query(sql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const subCategory: SubCategoryModel[] = data.map(
					(e: {
						id: number;
						name: string;
						category_id: number;
						image_url: string;
					}) =>
						new SubCategoryModel(
							e.id,
							e.name,
							e.category_id,
							e.image_url
						)
				);

				resolve(subCategory);
			});
		});
	}
}
