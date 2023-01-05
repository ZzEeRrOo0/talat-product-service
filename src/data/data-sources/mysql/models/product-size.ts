import { ProductSize } from "../../../../domain/entities/product-size";


export class ProductSizeModel implements ProductSize {
    id?: number | undefined;
    productId: number;
    product_size_type_id: string;
    size: string;
    price: string;

    constructor(
        id: number | undefined,
        productId: number,
        product_size_type_id: string,
        size: string,
        price: string
    ) {
        (this.id = id),
            (this.productId = productId),
            (this.product_size_type_id = product_size_type_id),
            (this.size = size),
            (this.price = price)
    }
}

