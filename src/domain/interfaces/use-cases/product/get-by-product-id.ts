import { ProductDetail } from "../../../entities/product-detail";

export interface GetProductByProductIdUseCase {
    execute(productId: string): Promise<ProductDetail[]>;
}