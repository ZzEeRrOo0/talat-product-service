import { ProductDetail } from './../../../../domain/entities/product-detail';

export class ProductDetailModel implements ProductDetail {
    id: number;
    name: String;
    code: String;
    image: String | undefined;
    productTypeId: number;
    categoryId: number;
    subCategoryId?: number | undefined;

    constructor(
        id: number,
        name: String,
        code: String,
        image: String | undefined,
        productTypeId: number,
        categoryId: number,
        subCategoryId: number | undefined
    ) {
        (this.id = id),
            (this.name = name),
            (this.code = code),
            (this.image = image),
            (this.productTypeId = productTypeId),
            (this.categoryId = categoryId),
            (this.subCategoryId = subCategoryId);
    }
}