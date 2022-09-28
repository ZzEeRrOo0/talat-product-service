import { Product } from "../../entities/product";
export interface ProductRepository {
	createProduct(product: Product): Promise<number>;
	getProducts(): Promise<Product[]>;
}
