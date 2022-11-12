import { ProductDetail } from './../../entities/product-detail';
import { Product } from "../../entities/product";
import { AllProduct } from '../../entities/all-product';
export interface ProductRepository {
	// createProduct(product: Product): Promise<number>;
	addProduct(product: Product): Promise<boolean>;
	getProducts(currentPage: number, pageSize: number): Promise<AllProduct>;
	getProductsByCategoryId(categoryId: string): Promise<ProductDetail[]>;
	getProductsBySubCategoryId(subCategoryId: string): Promise<ProductDetail[]>;
}
