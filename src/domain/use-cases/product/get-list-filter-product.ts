import { FilterProduct } from "../../entities/filter-product";
import { ProductRepository } from "../../interfaces/repositories/product-repository";
import { GetListFilterProductUseCase } from "../../interfaces/use-cases/product/get-list-filter-product";

export class GetListFilterProduct implements GetListFilterProductUseCase {
	productRepository: ProductRepository;
	constructor($productRepository: ProductRepository) {
		this.productRepository = $productRepository;
	}

	execute(name: string): Promise<FilterProduct[]> {
		return this.productRepository.getFilterProducts(name);
	}
}
