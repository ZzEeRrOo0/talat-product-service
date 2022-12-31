export interface Product {
	id?: number;
	name: string;
	code: string;
	product_type_id: number | null;
	category_id: number;
	sub_category_id: number | null;
	status: boolean;
	price: number;
	product_size_type: string;
	image_url: string;
}
