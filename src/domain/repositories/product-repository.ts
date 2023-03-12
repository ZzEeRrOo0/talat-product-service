import { ProductDetail } from "./../entities/product-detail";
import { ProductDataSource } from "../../data/interfaces/data-sources/mysql/product-data-source";
import { Product } from "../entities/product";
import { ProductRepository } from "../interfaces/repositories/product-repository";
import { AllProduct } from "../entities/all-product";
import { ProductImage } from "../entities/product-image";
import { Request } from "express";
import { CloudinaryDataSource } from "../../data/interfaces/data-sources/cloudinary/cloudinary-data-source";
import { FilterProduct } from "../entities/filter-product";

export class ProductRepositoryImpl implements ProductRepository {
	productDataSource: ProductDataSource;
	cloudinaryDataSource: CloudinaryDataSource;
	constructor(
		$productDataSource: ProductDataSource,
		$cloudinaryDataSource: CloudinaryDataSource,

	) {
		this.productDataSource = $productDataSource;
		this.cloudinaryDataSource = $cloudinaryDataSource;
	}
	
	async getProductByProductId(productId: string): Promise<ProductDetail[]> {
		const result = await this.productDataSource.getProductsByProductId(
			productId
		);
		return result;
	}
	async updateProductStatus(
		productId: string,
		productStatus: number
	): Promise<string> {
		const result = await this.productDataSource.updateProductStatus(
			productId,
			productStatus
		);
		return result;
	}
	async addProductImage(imageParams: ProductImage): Promise<string> {
		const result = await this.productDataSource.addProductImage(
			imageParams
		);
		return result;
	}
	async addProduct(product: Product): Promise<number> {
		const result = await this.productDataSource.addProduct(product);
		return result;
	}
	async getProductsBySubCategoryId(
		subCategoryId: string
	): Promise<ProductDetail[]> {
		const result = await this.productDataSource.getAllBySubCategoryId(
			subCategoryId
		);
		return result;
	}
	async getProducts(
		currentPage: number,
		pageSize: number,
		req: Request
	): Promise<AllProduct> {
		const result = await this.productDataSource.getAll(
			currentPage,
			pageSize,
			req
		);
		return result;
	}
	async getProductsByCategoryId(
		categoryId: string
	): Promise<ProductDetail[]> {
		const result = await this.productDataSource.getAllByCategoryId(
			categoryId
		);
		return result;
	}
	async uploadProductImage(
		file: string,
		folderName: string
	): Promise<string> {
		const result = await this.cloudinaryDataSource.uploadImage(
			file,
			folderName
		);
		return result;
	}

	async getFilterProducts(name: string): Promise<FilterProduct[]> {
		return await this.productDataSource.getListFilterProductName(name);
	}
}
