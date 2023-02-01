import { Product } from "./product";
import { PaginationResponse } from "../../core/pagination/index";

export interface AllProduct {
	products: Array<Product>;
	paginate: PaginationResponse;
}
