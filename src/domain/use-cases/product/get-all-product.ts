import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { GetAllProductUseCase } from "../../interfaces/use-cases/product/get-all-product";
import { AllProduct } from '../../entities/all-product';

export class GetAllProduct implements GetAllProductUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(currentPage: number, pageSize: number): Promise<AllProduct> {
        const result = await this.productRepository.getProducts(currentPage, pageSize)
        return result
    }
}