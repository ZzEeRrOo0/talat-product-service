import { Product } from "../../../../domain/entities/product";

export class ProductModel implements Product {
	id?: number | undefined;
	name!: string;
	code!: string;
	product_type_id!: number | null;
	category_id!: number;
	sub_category_id!: number | null;
	status!: boolean
	price!: number
	product_size_type!: string;
	image_url!: string

	constructor(
		id: number | undefined,
		name: string,
		code: string,
		product_type_id: number | null,
		category_id: number,
		sub_category_id: number | null,
		status: boolean,
		price: number,
		product_size_type: string,
		image_url: string
	) {
		(this.id = id),
			(this.name = name),
			(this.code = code),
			(this.product_type_id = product_type_id),
			(this.category_id = category_id),
			(this.sub_category_id = sub_category_id);
		(this.status = status);
		(this.price = price);
		(this.product_size_type = product_size_type);
		(this.image_url = image_url);
	}
}
