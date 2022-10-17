import { ProductDetail } from "../../entities/product-detail";
import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { GetAllProductsByCategoryIdUseCase } from "../../interfaces/use-cases/product/get-all-products-by-category-id";

export class GetAllProductsByCategoryId implements GetAllProductsByCategoryIdUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(categoryId: string): Promise<ProductDetail[]> {
        const result = await this.productRepository.getProductsByCategoryId(categoryId)
        return result
    }
}