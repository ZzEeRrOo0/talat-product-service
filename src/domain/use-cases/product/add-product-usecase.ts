import { Product } from "../../entities/product";
import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { AddProductUseCase } from "../../interfaces/use-cases/product/add-product";


export class AddProduct implements AddProductUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(product: Product): Promise<number> {
        const result = await this.productRepository.addProduct(product)
        return result
    }
}