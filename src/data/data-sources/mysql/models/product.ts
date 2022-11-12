import { Product } from "../../../../domain/entities/product";

export class ProductModel implements Product {
	id?: number | undefined;
	name!: string;
	code!: string;
	productTypeId!: number;
	categoryId!: number;
	subCategoryId?: number | undefined;

	constructor(
		id: number | undefined,
		name: string,
		code: string,
		productTypeId: number,
		categoryId: number,
		subCategoryId: number | undefined
	) {
		(this.id = id),
			(this.name = name),
			(this.code = code),
			(this.productTypeId = productTypeId),
			(this.categoryId = categoryId),
			(this.subCategoryId = subCategoryId);
	}
}
