import { ProductSizeType } from "../../../entities/product-size-type";

export interface GetAllProductSizeTypeUseCase {
    execute(): Promise<ProductSizeType[]>;
}