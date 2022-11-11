import { ProductType } from "../../entities/product-type";
import { ProductTypeRepository } from "../../interfaces/repositories/product-type-repository";
import { GetAllBySubCategoryIdUseCase } from "../../interfaces/use-cases/product-type/get-all-by-sub-category-id";

export class GetAllBySubCategoryId implements GetAllBySubCategoryIdUseCase {
    productTypeRepository: ProductTypeRepository
    constructor(productTypeRepository: ProductTypeRepository) {
        this.productTypeRepository = productTypeRepository
    }

    async execute(categoryId: string): Promise<ProductType[]> {
        const result = await this.productTypeRepository.getAllBySubCategoryId(categoryId);
        return result
    }
}