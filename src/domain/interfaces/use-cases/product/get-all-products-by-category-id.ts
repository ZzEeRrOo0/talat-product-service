import { ProductDetail } from "../../../entities/product-detail";

export interface GetAllProductsByCategoryIdUseCase {
    execute(categoryId: string): Promise<ProductDetail[]>;
}