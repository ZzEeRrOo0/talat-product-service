import { ProductSize } from "../../entities/product-size"
import { ProductSizeRepository } from "../../interfaces/repositories/product-size-repository"
import { AddProductSizeUseCase } from "../../interfaces/use-cases/product-size/add-product-size"

export class AddProductSize implements AddProductSizeUseCase {
    productSizeRepository: ProductSizeRepository
    constructor(productSizeRepository: ProductSizeRepository) {
        this.productSizeRepository = productSizeRepository
    }

    async execute(productSize: ProductSize): Promise<number> {
        const result = await this.productSizeRepository.addProductSize(productSize)
        return result
    }
}