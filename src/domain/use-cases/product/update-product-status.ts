import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { UpdateProductStatusUseCase } from "../../interfaces/use-cases/product/update-product-statatus-usecase";

export class UpdateProductStatus implements UpdateProductStatusUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(productId: string, productStatus: number): Promise<string> {
        const result = await this.productRepository.updateProductStatus(productId, productStatus)
        return result
    }
}