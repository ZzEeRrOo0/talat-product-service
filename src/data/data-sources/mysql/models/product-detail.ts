import { ProductDetail } from './../../../../domain/entities/product-detail';

export class ProductDetailModel implements ProductDetail {
    id: number;
    name: string;
    code: string;
    image: string | undefined;
    productTypeId: number;
    categoryId: number;
    subCategoryId?: number | undefined;
    status: boolean;
    categoryName?: string | undefined;
    subCategoryName?: string | undefined;
    productTypeName?: string | undefined;
    size?: number | undefined;
    price: number;
    productSizeType?: string | undefined;

    constructor(
        id: number,
        name: string,
        code: string,
        image: string | undefined,
        productTypeId: number,
        categoryId: number,
        subCategoryId: number | undefined,
        status: boolean,
        categoryName: string | undefined,
        subCategoryName: string | undefined,
        productTypeName: string | undefined,
        size: number | undefined,
        price: number,
        productSizeType: string | undefined,


    ) {
        (this.id = id),
            (this.name = name),
            (this.code = code),
            (this.image = image),
            (this.productTypeId = productTypeId),
            (this.categoryId = categoryId),
            (this.subCategoryId = subCategoryId);
        (this.categoryName = categoryName);
        (this.subCategoryName = subCategoryName);
        (this.productTypeName = productTypeName);
        (this.size = size);
        (this.price = price);
        (this.productSizeType = productSizeType);
        (this.status = status);
    }
}