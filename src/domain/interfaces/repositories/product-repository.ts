import { ProductDetail } from "./../../entities/product-detail";
import { Product } from "../../entities/product";
import { AllProduct } from "../../entities/all-product";
import { ProductImage } from "../../entities/product-image";
import { Request } from "express";
import { FilterProduct } from '../../entities/filter-product';

export interface ProductRepository {
	// createProduct(product: Product): Promise<number>;
	addProduct(product: Product): Promise<number>;
	getProducts(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllProduct>;
	getProductsByCategoryId(categoryId: string): Promise<ProductDetail[]>;
	getProductsBySubCategoryId(subCategoryId: string): Promise<ProductDetail[]>;
	uploadProductImage(file: string, folderName: string): Promise<string>;
	addProductImage(imageParams: ProductImage): Promise<string>;
	updateProductStatus(productId: string, productStatus: number): Promise<string>;
	deleteProduct(productId: string): Promise<boolean>;
	getProductByProductId(productId: string): Promise<ProductDetail[]>;
	getFilterProducts(name: string): Promise<FilterProduct[]>;
}
