import { ProductTypeDataSource } from "../../data/interfaces/data-sources/mysql/product-type";
import { ProductType } from "../entities/product-type";
import { ProductTypeRepository } from "../interfaces/repositories/product-type-repository";


export class ProductTypeRepositoryImpl implements ProductTypeRepository {
    productTypeDataSource: ProductTypeDataSource
    constructor(productTypeDataSource: ProductTypeDataSource) {
        this.productTypeDataSource = productTypeDataSource
    }

    async getAllBySubCategoryId(subCategoryId: string): Promise<ProductType[]> {
        const result = await this.productTypeDataSource.getAllById(subCategoryId)
        return result;
    }
}