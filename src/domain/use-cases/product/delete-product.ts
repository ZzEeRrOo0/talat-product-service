import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { DeleteProductUseCase } from "../../interfaces/use-cases/product/delete-product";

export class DeleteProduct implements DeleteProductUseCase {
	productRepository: ProductRepository;
	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

	async execute(productId: string): Promise<boolean> {
		const result = await this.productRepository.deleteProduct(productId);
		return result;
	}
}
