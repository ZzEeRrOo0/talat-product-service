import { ProductDetail } from './../../../../domain/entities/product-detail';
import { Product } from "../../../../domain/entities/product";

export interface ProductDataSource {
    create(product: Product): Promise<number>;
    getAll(): Promise<Product[]>;
    getAllByCategoryId(categoryId: string): Promise<ProductDetail[]>;
}