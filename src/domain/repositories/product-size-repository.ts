import { ProductSizeDataSource } from "../../data/interfaces/data-sources/mysql/product-size-data-source";
import { ProductSize } from "../entities/product-size";
import { ProductSizeRepository } from "../interfaces/repositories/product-size-repository";

export class ProductSizeRepositoryImpl implements ProductSizeRepository {
    productSizeDataSource: ProductSizeDataSource
    constructor(productSizeDataSource: ProductSizeDataSource) {
        this.productSizeDataSource = productSizeDataSource
    }

    async updateProductPrice(productId: string, productPrice: string): Promise<string> {
        const result = await this.productSizeDataSource.updateProductPrice(
            productId,
            productPrice,
        );
        return result;
    }

    async addProductSize(productSize: ProductSize): Promise<number> {
        const result = await this.productSizeDataSource.addProductSize(productSize)
        return result;
    }

}