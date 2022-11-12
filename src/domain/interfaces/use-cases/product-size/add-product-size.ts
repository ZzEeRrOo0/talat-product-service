import { ProductSize } from "../../../entities/product-size";

export interface AddProductSizeUseCase {
    execute(productSize: ProductSize): Promise<number>;
}
