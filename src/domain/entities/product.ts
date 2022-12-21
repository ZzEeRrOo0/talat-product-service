export interface Product {
	id?: number;
	name: string;
	code: string;
	product_type_id: number;
	category_id: number;
	sub_category_id?: number;
	status: boolean;
	price: number;
	image_url: string;
}
