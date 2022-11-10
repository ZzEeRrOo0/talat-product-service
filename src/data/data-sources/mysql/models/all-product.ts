import { PaginationResponse } from "../../../../core/pagination";
import { AllProduct } from "../../../../domain/entities/all-product";
import { Product } from "../../../../domain/entities/product";

export class AllProductModel implements AllProduct {
	products: Product[];
	paginate: PaginationResponse;

	constructor($products: Product[], $paginate: PaginationResponse) {
		this.products = $products;
		this.paginate = $paginate;
	}
}
