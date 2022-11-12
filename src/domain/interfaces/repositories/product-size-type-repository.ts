import { ProductSizeType } from "../../entities/product-size-type";
export interface ProductSizeTypeRepository {
    getAll(): Promise<ProductSizeType[]>;
}