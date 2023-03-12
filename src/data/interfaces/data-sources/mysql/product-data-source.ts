import { ProductDetail } from "./../../../../domain/entities/product-detail";
import { Product } from "../../../../domain/entities/product";
import { AllProduct } from "../../../../domain/entities/all-product";
import { ProductImage } from "../../../../domain/entities/product-image";
import { Request } from "express";
import { FilterProduct } from "../../../../domain/entities/filter-product";

export interface ProductDataSource {
	// create(product: Product): Promise<number>;
	addProduct(product: Product): Promise<number>;
	getAll(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllProduct>;
	getAllByCategoryId(categoryId: string): Promise<ProductDetail[]>;
	getAllBySubCategoryId(subCategoryId: string): Promise<ProductDetail[]>;
	addProductImage(productImage: ProductImage): Promise<string>;
	updateProductStatus(
		productId: string,
		productStatus: number
	): Promise<string>;
	getProductsByProductId(productId: string): Promise<ProductDetail[]>;
	getListFilterProductName(name: string): Promise<FilterProduct[]>;
}
