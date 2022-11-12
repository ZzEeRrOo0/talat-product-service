import { ProductDetail } from './../../../../domain/entities/product-detail';
import { Product } from "../../../../domain/entities/product";
import { AllProduct } from '../../../../domain/entities/all-product';

export interface ProductDataSource {
    // create(product: Product): Promise<number>;
    addProduct(product: Product): Promise<boolean>;
    getAll(currentPage: number, pageSize: number): Promise<AllProduct>;
    getAllByCategoryId(categoryId: string): Promise<ProductDetail[]>;
    getAllBySubCategoryId(subCategoryId: string): Promise<ProductDetail[]>;
}