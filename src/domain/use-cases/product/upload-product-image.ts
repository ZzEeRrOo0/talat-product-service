import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { UploadProductImageUseCase } from "../../interfaces/use-cases/product/upload-product-image";

export class UploadProductImage implements UploadProductImageUseCase {
	productRepository: ProductRepository;
	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}
	async execute(file: any, folderName: string): Promise<string> {
		const result = await this.productRepository.uploadProductImage(
			file,
			folderName
		);
		return result;
	}
}
