import { Product } from "../../entities/product";
import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { GetAllProductUseCase } from "../../interfaces/use-cases/product/get-all-product";

export class GetAllProduct implements GetAllProductUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(): Promise<Product[]> {
        const result = await this.productRepository.getProducts()
        return result
    }
}