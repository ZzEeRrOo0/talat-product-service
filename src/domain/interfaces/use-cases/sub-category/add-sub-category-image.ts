import { ProductImage } from "../../../entities/product-image";

export interface AddSubCategoryImageUseCase {
    execute(imageParams: ProductImage): Promise<string>;
}