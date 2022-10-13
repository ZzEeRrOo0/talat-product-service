
import { db } from "../../../../config/database";
import { CategoriesModel } from "./models/categories";
import { CategoriesDataSource } from "../../interfaces/data-sources/mysql/categories-data-source";

export class CategoriesDataSourceImpl implements CategoriesDataSource {
    getAll(): Promise<CategoriesModel[]> {
        const sql = "SELECT * FROM categories WHERE deleted_at IS NULL";

        return new Promise((resolve, reject) => {
            db.query(sql, [], (error, result) => {
                if (error) {
                    throw new Error("Internal server error.");
                }

                const data = JSON.parse(JSON.stringify(result));

                const products: CategoriesModel[] = data.map(
                    (e: {
                        id: number;
                        name: String;
                    }) =>
                        new CategoriesModel(
                            e.id,
                            e.name
                        )
                );

                resolve(products);
            });
        });
    }
}
