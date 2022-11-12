import { ProductSizeTypeDataSource } from "../../data/interfaces/data-sources/mysql/product-size-type-data-source";
import { ProductSizeType } from "../entities/product-size-type";
import { ProductSizeTypeRepository } from "../interfaces/repositories/product-size-type-repository";


export class ProductTypeSizeRepositoryImpl implements ProductSizeTypeRepository {
    productSizeTypeDataSource: ProductSizeTypeDataSource
    constructor(productSizeTypeDataSource: ProductSizeTypeDataSource) {
        this.productSizeTypeDataSource = productSizeTypeDataSource
    }

    async getAll(): Promise<ProductSizeType[]> {
        const result = await this.productSizeTypeDataSource.getAll()
        return result;
    }
}