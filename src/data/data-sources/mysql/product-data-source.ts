import { ProductDataSource } from "../../interfaces/data-sources/mysql/product-data-source";
import { db } from "../../../../config/database";
import { ProductModel } from "./models/product";
import { OkPacket } from "mysql2";
import { ProductDetailModel } from "./models/product-detail";
import { Pagination } from "../../../core/pagination/index";
import { AllProductModel } from "./models/all-product";
import { ProductImage } from "../../../domain/entities/product-image";
import { FindProductByQuery } from "../../../core/util/mysql/find-product-by-query";
import { Request } from "express";

export class ProductDataSourceImpl implements ProductDataSource {
	paginationService: Pagination;
	findProductByQuery: FindProductByQuery;

	constructor(
		$paginationService: Pagination,
		$findProductByQuery: FindProductByQuery
	) {
		this.paginationService = $paginationService;
		this.findProductByQuery = $findProductByQuery;
	}
	updateProductStatus(productId: string, productStatus: number): Promise<string> {
		const sql =
			"UPDATE products SET status = ? WHERE id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(
				sql,
				[
					productStatus,
					productId,
				],
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

	addProductImage(productImage: ProductImage): Promise<string> {
		const sql =
			"INSERT INTO product_images (product_id, image_name) VALUES(?, ?)";

		return new Promise((resolve, reject) => {
			db.query(
				sql,
				[productImage.productID, productImage.imagePath],
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

	addProduct(product: ProductModel): Promise<number> {
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

	getAll(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllProductModel> {
		const getTotalItemSql =
			"SELECT COUNT(*) AS total FROM products WHERE deleted_at IS NULL";
		const getProductsSql = `SELECT p.id,p.name,p.code,p.status,(SELECT price from product_size WHERE product_id = p.id AND deleted_at IS NULL LIMIT 1) AS price FROM products AS p WHERE ${this.findProductByQuery.whereSql(
			req
		)} LIMIT ? OFFSET ?`;

		return new Promise((resolve, reject) => {
			db.query(getTotalItemSql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const paginate = this.paginationService.paginate(
					data[0].total,
					currentPage,
					pageSize,
					20
				);

				db.query(
					getProductsSql,
					[paginate.pageSize, paginate.startIndex],
					(pError, pResult) => {
						if (pError) {
							throw new Error("Internal server error.");
						}

						const data = JSON.parse(JSON.stringify(pResult));

						const products: ProductModel[] = data.map(
							(e: {
								id: number;
								name: string;
								code: string;
								product_type_id: number;
								category_id: number;
								sub_category_id: number | undefined;
								status: boolean;
								price: number;
							}) =>
								new ProductModel(
									e.id,
									e.name,
									e.code,
									e.product_type_id,
									e.category_id,
									e.sub_category_id,
									e.status,
									e.price
								)
						);

						const allProductResponse = new AllProductModel(
							products,
							paginate
						);

						resolve(allProductResponse);
					}
				);
			});
		});
	}

	getAllByCategoryId(categoryId: string): Promise<ProductDetailModel[]> {
		const sql =
			"SELECT id,name,code,product_type_id,category_id,sub_category_id,(SELECT image_name FROM product_images WHERE product_id = id AND deleted_at IS NULL) AS image FROM products WHERE category_id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(sql, [categoryId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const products: ProductDetailModel[] = data.map(
					(e: {
						id: number;
						name: string;
						code: string;
						image: string | undefined;
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

	getAllBySubCategoryId(
		subCategoryId: string
	): Promise<ProductDetailModel[]> {
		const sql =
			"SELECT id,name,code,product_type_id,category_id,sub_category_id,(SELECT image_name FROM product_images WHERE product_id = id AND deleted_at IS NULL) AS image FROM products WHERE sub_category_id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(sql, [subCategoryId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = JSON.parse(JSON.stringify(result));

				const products: ProductDetailModel[] = data.map(
					(e: {
						id: number;
						name: string;
						code: string;
						image: string | undefined;
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
