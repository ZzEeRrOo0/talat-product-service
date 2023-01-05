import { ProductImage } from "../../../../domain/entities/product-image";
import { SubCategory } from "../../../../domain/entities/sub-category";

export interface SubCategoryDataSource {
    getAllById(categoryId: string): Promise<SubCategory[]>;
    addSubCategoryImage(productImage: ProductImage): Promise<string>;
}