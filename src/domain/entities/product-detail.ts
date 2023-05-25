export interface ProductDetail {
	id: number;
	name: string;
	price: number;
	code: string;
	image?: string;
	productTypeId: number;
	categoryId: number;
	subCategoryId?: number;
	status: boolean;
	categoryName?: string | undefined;
	subCategoryName?: string | undefined;
	productTypeName?: string | undefined;
	size?: number | undefined;
	productSizeType?: string | undefined;
}
