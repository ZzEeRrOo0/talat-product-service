import { ProductSize } from "../../../../domain/entities/product-size";

export interface ProductSizeDataSource {
    addProductSize(productSize: ProductSize): Promise<number>;
    updateProductPrice(productId: string, productPrice: string): Promise<string>;
}