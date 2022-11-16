import { Product } from "../../../../domain/entities/product";

export class ProductModel implements Product {
	id?: number | undefined;
	name!: string;
	code!: string;
	productTypeId!: number;
	categoryId!: number;
	subCategoryId?: number | undefined;
	status!: boolean
	price!: number

	constructor(
		id: number | undefined,
		name: string,
		code: string,
		productTypeId: number,
		categoryId: number,
		subCategoryId: number | undefined,
		status: boolean,
		price: number
	) {
		(this.id = id),
			(this.name = name),
			(this.code = code),
			(this.productTypeId = productTypeId),
			(this.categoryId = categoryId),
			(this.subCategoryId = subCategoryId);
		(this.status = status);
		(this.price = price);
	}
}
