import { ProductImage } from "../../entities/product-image";
import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { AddProductImageUseCase } from "../../interfaces/use-cases/product/add-product-image";

export class AddProductImage implements AddProductImageUseCase {
    productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }
    async execute(imageParams: ProductImage): Promise<string> {
        const result = await this.productRepository.addProductImage(
            imageParams
        );
        return result;
    }
}
