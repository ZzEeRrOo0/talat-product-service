import { db } from "../../../../config/database";
import { OkPacket } from "mysql2";
import { Pagination } from "../../../core/pagination/index";
import { ProductSizeModel } from "./models/product-size";
import { ProductSizeDataSource } from "../../interfaces/data-sources/mysql/product-size-data-source";


export class ProductSizeDataSourceImpl implements ProductSizeDataSource {
    paginationService: Pagination;

    constructor($paginationService: Pagination) {
        this.paginationService = $paginationService;
    }

    addProductSize(productSize: ProductSizeModel): Promise<number> {
        const sql =
            "INSERT INTO product_size (product_id, product_size_type_id, size, price) VALUES(?, ?, ?, ?)";

        return new Promise((resolve, reject) => {
            db.query(
                sql,
                [
                    productSize.productId,
                    productSize.productSizeTypeId,
                    productSize.size,
                    productSize.price,
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

}
