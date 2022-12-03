import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { GetAllProductUseCase } from "../../interfaces/use-cases/product/get-all-product";
import { AllProduct } from '../../entities/all-product';
import { Request } from "express";


export class GetAllProduct implements GetAllProductUseCase {
    productRepository: ProductRepository
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(currentPage: number, pageSize: number, req: Request): Promise<AllProduct> {
        const result = await this.productRepository.getProducts(currentPage, pageSize, req)
        return result
    }
}