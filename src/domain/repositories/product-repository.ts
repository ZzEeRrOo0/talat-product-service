import { ProductDetail } from './../entities/product-detail';
import { ProductDataSource } from "../../data/interfaces/data-sources/mysql/product-data-source";
import { Product } from "../entities/product";
import { ProductRepository } from "../interfaces/repositories/product-repository";

export class ProductRepositoryImpl implements ProductRepository {
    productDataSource: ProductDataSource
    constructor(productDataSource: ProductDataSource) {
        this.productDataSource = productDataSource
    }

    async createProduct(product: Product): Promise<number> {
        const result = await this.productDataSource.create(product)
        return result;
    }
    async getProducts(): Promise<Product[]> {
        const result = await this.productDataSource.getAll()
        return result;
    }
    async getProductsByCategoryId(categoryId: string): Promise<ProductDetail[]> {
        const result = await this.productDataSource.getAllByCategoryId(categoryId)
        return result;
    }
}