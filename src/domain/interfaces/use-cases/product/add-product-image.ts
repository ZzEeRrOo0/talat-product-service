import { ProductImage } from "../../../entities/product-image";

export interface AddProductImageUseCase {
    execute(imageParams: ProductImage): Promise<string>;
}