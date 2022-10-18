import { ProductDetail } from "../../entities/product-detail";
import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { GetAllProductsBySubCategoryIdUseCase } from "../../interfaces/use-cases/product/get-all-products-by-sub-category-id";

export class GetAllProductsBySubCategoryId implements GetAllProductsBySubCategoryIdUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(subCategoryId: string): Promise<ProductDetail[]> {
        const result = await this.productRepository.getProductsBySubCategoryId(subCategoryId)
        return result
    }
}