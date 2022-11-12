import { ProductType } from "../../../../domain/entities/product-type";

export interface ProductTypeDataSource {
    getAllById(subCategoryId: string): Promise<ProductType[]>;
}