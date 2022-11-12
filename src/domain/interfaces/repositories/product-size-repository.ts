import { ProductSize } from "../../entities/product-size";

export interface ProductSizeRepository {
    addProductSize(productSize: ProductSize): Promise<number>;
}