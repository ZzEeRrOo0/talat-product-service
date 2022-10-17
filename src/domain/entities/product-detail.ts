export interface ProductDetail {
    id: number;
    name: String;
    code: String;
    image?: String;
    productTypeId: number;
    categoryId: number;
    subCategoryId?: number;
}