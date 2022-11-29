import { ProductDetail } from './../../entities/product-detail';
import { Product } from "../../entities/product";
import { AllProduct } from '../../entities/all-product';
import { ProductImage } from '../../entities/product-image';
export interface ProductRepository {
	// createProduct(product: Product): Promise<number>;
	addProduct(product: Product): Promise<number>;
	getProducts(currentPage: number, pageSize: number): Promise<AllProduct>;
	getProductsByCategoryId(categoryId: string): Promise<ProductDetail[]>;
	getProductsBySubCategoryId(subCategoryId: string): Promise<ProductDetail[]>;
	uploadProductImage(file: any, folderName: string): Promise<string>;
	addProductImage(imageParams: ProductImage): Promise<string>;
}
