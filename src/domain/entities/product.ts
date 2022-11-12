export interface Product {
	id?: number;
	name: string;
	code: string;
	productTypeId: number;
	categoryId: number;
	subCategoryId?: number;
}
