
import { db } from "../../../../config/database";
import { ProductSizeTypeDataSource } from "../../interfaces/data-sources/mysql/product-size-type-data-source";
import { ProductSizeTypeModel } from "./models/product-size-type";

export class ProductSizeTypeDataSourceImpl implements ProductSizeTypeDataSource {
    getAll(): Promise<ProductSizeTypeModel[]> {
        const sql = "SELECT * FROM product_size_type WHERE deleted_at IS NULL";

        return new Promise((resolve, reject) => {
            db.query(sql, [], (error, result) => {
                if (error) {
                    throw new Error("Internal server error.");
                }

                const data = JSON.parse(JSON.stringify(result));

                const productSizeType: ProductSizeTypeModel[] = data.map(
                    (e: {
                        id: number;
                        name: string;
                    }) =>
                        new ProductSizeTypeModel(
                            e.id,
                            e.name
                        )
                );

                resolve(productSizeType);
            });
        });
    }
}
