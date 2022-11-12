import { ProductSize } from "../../../../domain/entities/product-size";

export interface ProductSizeDataSource {
    addProductSize(productSize: ProductSize): Promise<number>;
}