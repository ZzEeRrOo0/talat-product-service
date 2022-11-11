import { ProductSizeType } from "../../../../domain/entities/product-size-type";


export interface ProductSizeTypeDataSource {
    getAll(): Promise<ProductSizeType[]>;
}