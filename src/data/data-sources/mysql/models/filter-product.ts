import { FilterProduct } from "../../../../domain/entities/filter-product";

export class FilterProductModel implements FilterProduct {
	product_name: string;

	constructor($product_name: string) {
		this.product_name = $product_name;
	}
}
