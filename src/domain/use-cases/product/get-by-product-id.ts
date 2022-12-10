import { ProductDetail } from "../../entities/product-detail";
import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { GetProductByProductIdUseCase } from "../../interfaces/use-cases/product/get-by-product-id";


export class GetProductByProductId implements GetProductByProductIdUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(productId: string): Promise<ProductDetail[]> {
        const result = await this.productRepository.getProductByProductId(productId)
        return result
    }
}