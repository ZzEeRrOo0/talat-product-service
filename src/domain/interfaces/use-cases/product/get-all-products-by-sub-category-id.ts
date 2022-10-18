import { ProductDetail } from "../../../entities/product-detail";

export interface GetAllProductsBySubCategoryIdUseCase {
    execute(subCategoryId: string): Promise<ProductDetail[]>;
}