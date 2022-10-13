
import { db } from "../../../../config/database";
import { SubCategoryDataSource } from "../../interfaces/data-sources/mysql/sub-category-data-source";
import { SubCategoryModel } from "./models/sub-category";


export class SubCategoryDataSourceImpl implements SubCategoryDataSource {
    getAllById(categoryId: string): Promise<SubCategoryModel[]> {
        const sql = `SELECT id,name,category_id FROM sub_category WHERE category_id = ${categoryId} AND deleted_at IS NULL`;

        return new Promise((resolve, reject) => {
            db.query(sql, [], (error, result) => {
                if (error) {
                    throw new Error("Internal server error.");
                }

                const data = JSON.parse(JSON.stringify(result));

                const subCategory: SubCategoryModel[] = data.map(
                    (e: {
                        id: number;
                        name: String;
                        category_id: number;
                    }) =>
                        new SubCategoryModel(
                            e.id,
                            e.name,
                            e.category_id
                        )
                );

                resolve(subCategory);
            });
        });
    }
}
