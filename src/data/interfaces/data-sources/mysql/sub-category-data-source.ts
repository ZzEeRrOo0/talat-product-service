import { ProductImage } from "../../../../domain/entities/product-image";
import { SubCategory } from "../../../../domain/entities/sub-category";

export interface SubCategoryDataSource {
    getAllByCategoryId(categoryId: string): Promise<SubCategory[]>;
    addSubCategoryImage(productImage: ProductImage): Promise<string>;
}