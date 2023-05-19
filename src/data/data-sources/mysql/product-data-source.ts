import { ProductDataSource } from "../../interfaces/data-sources/mysql/product-data-source";
import { db } from "../../../../config/database";
import { ProductModel } from "./models/product";
import { OkPacket, RowDataPacket } from "mysql2";
import { ProductDetailModel } from "./models/product-detail";
import { Pagination } from "../../../core/pagination/index";
import { AllProductModel } from "./models/all-product";
import { FindProductByQuery } from "../../../core/util/mysql/find-product-by-query";
import { Request } from "express";
import { ProductImageModel } from "./models/product-image";
import { FilterProductModel } from "./models/filter-product";

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

	getProductsByProductId(productId: string): Promise<ProductDetailModel[]> {
		const sql =
			"SELECT p.id,p.name,p.code,p.status,p.product_type_id,p.category_id,p.sub_category_id,ps.size,ps.price," +
			"(SELECT name FROM product_size_type WHERE id = ps.product_size_type_id AND deleted_at IS NULL) AS product_size_type, " +
			"(SELECT name FROM categories WHERE id = p.category_id AND deleted_at IS NULL) AS category_name, " +
			"(SELECT name FROM sub_category WHERE id = p.sub_category_id AND deleted_at IS NULL) AS sub_category_name, " +
			"(SELECT name FROM product_type WHERE id = p.product_type_id AND deleted_at IS NULL) AS product_type_name, " +
			"(SELECT image_url FROM product_images WHERE product_id = p.id AND deleted_at IS NULL) AS image " +
			"FROM products AS p LEFT JOIN product_size AS ps ON p.id = ps.product_id WHERE p.id = ? AND p.deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(sql, [productId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = <RowDataPacket>result;

				const products: ProductDetailModel[] = data.map(
					(e: {
						id: number;
						name: string;
						code: string;
						image: string | undefined;
						product_type_id: number;
						category_id: number;
						sub_category_id: number | undefined;
						status: boolean;
						category_name?: string | undefined;
						sub_category_name?: string | undefined;
						product_type_name?: string | undefined;
						size: number | undefined;
						price: number;
						product_size_type: string | undefined;
					}) =>
						new ProductDetailModel(
							e.id,
							e.name,
							e.code,
							e.image,
							e.product_type_id,
							e.category_id,
							e.sub_category_id,
							e.status,
							e.category_name,
							e.sub_category_name,
							e.product_type_name,
							e.size,
							e.price,
							e.product_size_type
						)
				);

				resolve(products);
			});
		});
	}
	updateProductStatus(
		productId: string,
		productStatus: number
	): Promise<string> {
		const sql =
			"UPDATE products SET status = ? WHERE id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(sql, [productStatus, productId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}
				const insertId = (<OkPacket>result).insertId;
				resolve(insertId.toString());
			});
		});
	}

	addProductImage(productImage: ProductImageModel): Promise<string> {
		const sql =
			"INSERT INTO product_images (product_id, image_url) VALUES(?, ?)";

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
					product.product_type_id,
					product.category_id,
					product.sub_category_id,
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
		const getTotalItemSql = req.query.name
			? `SELECT COUNT(*) AS total FROM products WHERE name LIKE '%${req.query.name}%' AND deleted_at IS NULL`
			: "SELECT COUNT(*) AS total FROM products WHERE deleted_at IS NULL";
		const getProductsSql =
			"SELECT p.id,p.name,p.code,p.status, ps.price, c.id AS category_id, sc.id AS sub_category_id, pt.id AS product_type_id, pst.name AS product_size_type, " +
			"(SELECT image_url FROM product_images WHERE product_id = p.id AND deleted_at IS NULL LIMIT 1) AS image_url " +
			"FROM products AS p " +
			"LEFT JOIN categories AS c ON c.id = p.category_id " +
			"LEFT JOIN sub_category AS sc ON sc.id = p.sub_category_id " +
			"LEFT JOIN product_type AS pt ON pt.id = p.product_type_id " +
			"LEFT JOIN product_size AS ps ON ps.product_id = p.id " +
			"LEFT JOIN product_size_type AS pst ON pst.id = ps.product_size_type_id " +
			`WHERE ${this.findProductByQuery.whereSql(req)} LIMIT ? OFFSET ?`;

		return new Promise((resolve, reject) => {
			db.query(getTotalItemSql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = <RowDataPacket>result;

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
							console.log(pError);
							throw new Error("Internal server error.");
						}

						const data = <RowDataPacket>pResult;

						const products: ProductModel[] = data.map(
							(e: {
								id: number;
								name: string;
								code: string;
								product_type_id: number | null;
								category_id: number;
								sub_category_id: number | null;
								status: boolean;
								price: number;
								product_size_type: string;
								image_url: string;
							}) =>
								new ProductModel(
									e.id,
									e.name,
									e.code,
									e.product_type_id ?? null,
									e.category_id,
									e.sub_category_id ?? null,
									e.status,
									e.price,
									e.product_size_type,
									e.image_url
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
			"SELECT p.id,p.name,p.code,p.status,p.product_type_id,p.category_id,p.sub_category_id," +
			"(SELECT name FROM categories WHERE id = p.category_id AND deleted_at IS NULL) AS category_name, " +
			"(SELECT name FROM sub_category WHERE id = p.sub_category_id AND deleted_at IS NULL) AS sub_category_name, " +
			"(SELECT name FROM product_type WHERE id = p.product_type_id AND deleted_at IS NULL) AS product_type_name, " +
			"(SELECT image_url FROM product_images WHERE product_id = p.id AND deleted_at IS NULL) AS image " +
			"FROM products AS p WHERE category_id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(sql, [categoryId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = <RowDataPacket>result;

				const products: ProductDetailModel[] = data.map(
					(e: {
						id: number;
						name: string;
						code: string;
						image: string | undefined;
						product_type_id: number;
						category_id: number;
						sub_category_id: number | undefined;
						status: boolean;
						category_name?: string | undefined;
						sub_category_name?: string | undefined;
						product_type_name?: string | undefined;
						size: number | undefined;
						price: number;
						productSizeType: string | undefined;
					}) =>
						new ProductDetailModel(
							e.id,
							e.name,
							e.code,
							e.image,
							e.product_type_id,
							e.category_id,
							e.sub_category_id,
							e.status,
							e.category_name,
							e.sub_category_name,
							e.product_type_name,
							e.size,
							e.price,
							e.productSizeType
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
			"SELECT p.id,p.name,p.code,p.status,p.product_type_id,p.category_id,p.sub_category_id," +
			"(SELECT name FROM categories WHERE id = p.category_id AND deleted_at IS NULL) AS category_name, " +
			"(SELECT name FROM sub_category WHERE id = p.sub_category_id AND deleted_at IS NULL) AS sub_category_name, " +
			"(SELECT name FROM product_type WHERE id = p.product_type_id AND deleted_at IS NULL) AS product_type_name, " +
			"(SELECT image_url FROM product_images WHERE product_id = p.id AND deleted_at IS NULL) AS image " +
			"FROM products AS p WHERE sub_category_id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			db.query(sql, [subCategoryId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = <RowDataPacket>result;

				const products: ProductDetailModel[] = data.map(
					(e: {
						id: number;
						name: string;
						code: string;
						image: string | undefined;
						product_type_id: number;
						category_id: number;
						sub_category_id: number | undefined;
						status: boolean;
						category_name?: string | undefined;
						sub_category_name?: string | undefined;
						product_type_name?: string | undefined;
						size: number | undefined;
						price: number;
						productSizeType: string | undefined;
					}) =>
						new ProductDetailModel(
							e.id,
							e.name,
							e.code,
							e.image,
							e.product_type_id,
							e.category_id,
							e.sub_category_id,
							e.status,
							e.category_name,
							e.sub_category_name,
							e.product_type_name,
							e.size,
							e.price,
							e.productSizeType
						)
				);

				resolve(products);
			});
		});
	}

	getListFilterProductName(name: string): Promise<FilterProductModel[]> {
		const sql = `SELECT * FROM products WHERE name LIKE '%${name}%' AND deleted_at is NULL LIMIT 20`;

		return new Promise((reslove, reject) => {
			db.query(sql, [], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}

				const data = <RowDataPacket>result;

				const listFilterProduct: FilterProductModel[] = data.map(
					(e: { name: string }) => new FilterProductModel(e.name)
				);

				reslove(listFilterProduct);
			});
		});
	}
}
