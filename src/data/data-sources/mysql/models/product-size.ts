import { ProductSize } from "../../../../domain/entities/product-size";


export class ProductSizeModel implements ProductSize {
    id?: number | undefined;
    productId: number;
    productSizeTypeId: number;
    size: string;
    price: string;

    constructor(
        id: number | undefined,
        productId: number,
        productSizeTypeId: number,
        size: string,
        price: string
    ) {
        (this.id = id),
            (this.productId = productId),
            (this.productSizeTypeId = productSizeTypeId),
            (this.size = size),
            (this.price = price)
    }
}

