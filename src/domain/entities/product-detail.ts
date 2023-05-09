export interface ProductDetail {
    id: number;
    name: string;
	price: number;
    code: string;
    image?: string;
    productTypeId: number;
    categoryId: number;
    subCategoryId?: number;
}