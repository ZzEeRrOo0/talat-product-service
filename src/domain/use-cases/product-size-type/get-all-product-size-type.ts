
import { ProductSizeType } from "../../entities/product-size-type";
import { ProductSizeTypeRepository } from "../../interfaces/repositories/product-size-type-repository";
import { GetAllProductSizeTypeUseCase } from "../../interfaces/use-cases/product-size-type/get-by-sub-category-usecase";

export class GetAllProductSizeType implements GetAllProductSizeTypeUseCase {
    productSizeTypeRepository: ProductSizeTypeRepository
    constructor(productSizeTypeRepository: ProductSizeTypeRepository) {
        this.productSizeTypeRepository = productSizeTypeRepository
    }

    async execute(): Promise<ProductSizeType[]> {
        const result = await this.productSizeTypeRepository.getAll()
        return result
    }
}