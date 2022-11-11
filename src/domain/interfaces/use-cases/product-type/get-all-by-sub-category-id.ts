import { ProductType } from "../../../entities/product-type";

export interface GetAllBySubCategoryIdUseCase {
    execute(subCategoryId: string): Promise<ProductType[]>;
}