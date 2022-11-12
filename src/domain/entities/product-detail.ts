export interface ProductDetail {
    id: number;
    name: string;
    code: string;
    image?: string;
    productTypeId: number;
    categoryId: number;
    subCategoryId?: number;
}