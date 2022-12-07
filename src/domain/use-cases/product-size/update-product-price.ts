import { ProductSizeRepository } from "../../interfaces/repositories/product-size-repository";
import { UpdateProductPriceUseCase } from "../../interfaces/use-cases/product-size/update-product-price";

export class UpdateProductPrice implements UpdateProductPriceUseCase {
    productSizeRepository: ProductSizeRepository
    constructor(productSizeRepository: ProductSizeRepository) {
        this.productSizeRepository = productSizeRepository
    }

    async execute(productId: string, productPrice: string): Promise<string> {
        const result = await this.productSizeRepository.updateProductPrice(productId, productPrice)
        return result
    }
}