import { ProductSize } from "../../../../domain/entities/product-size";


export class ProductSizeModel implements ProductSize {
    id?: number | undefined;
    productId: number;
    product_size_type_id: string;
    size: number;
    price: number;

    constructor(
        id: number | undefined,
        productId: number,
        product_size_type_id: string,
        size: number,
        price: number
    ) {
        (this.id = id),
            (this.productId = productId),
            (this.product_size_type_id = product_size_type_id),
            (this.size = size),
            (this.price = price)
    }
}

