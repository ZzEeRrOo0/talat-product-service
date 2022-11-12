import { ProductDetail } from "./../entities/product-detail";
import { ProductDataSource } from "../../data/interfaces/data-sources/mysql/product-data-source";
import { Product } from "../entities/product";
import { ProductRepository } from "../interfaces/repositories/product-repository";
import { AllProduct } from "../entities/all-product";
import { FirebaseStorageDataSource } from "../../data/interfaces/data-sources/firebase/firebase-storage-data-source";

export class ProductRepositoryImpl implements ProductRepository {
	productDataSource: ProductDataSource;
	firebaseStorageDataSource: FirebaseStorageDataSource;
	constructor(
		productDataSource: ProductDataSource,
		firebaseStorageDataSource: FirebaseStorageDataSource
	) {
		this.productDataSource = productDataSource;
		this.firebaseStorageDataSource = firebaseStorageDataSource;
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
		pageSize: number
	): Promise<AllProduct> {
		const result = await this.productDataSource.getAll(
			currentPage,
			pageSize
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
	async uploadProductImage(file: any, folderName: String): Promise<String> {
		const result = await this.firebaseStorageDataSource.uploadProductImage(
			file,
			folderName
		);
		return result;
	}
}
