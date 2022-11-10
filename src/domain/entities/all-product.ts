import { Product } from "./product";
import { PaginationResponse } from "../../core/pagination/index";

export class AllProduct {
	products: Array<Product>;
	paginate: PaginationResponse;

	constructor($products: Array<Product>, $paginate: PaginationResponse) {
		this.products = $products;
		this.paginate = $paginate;
	}
}
