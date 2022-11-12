import { ProductType } from "../../entities/product-type";

export interface ProductTypeRepository {
    getAllBySubCategoryId(sub_category_id: string): Promise<ProductType[]>;
}