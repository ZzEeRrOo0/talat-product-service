import { SubCategory } from "../../../../domain/entities/sub-category";

export interface SubCategoryDataSource {
    getAllById(categoryId: string): Promise<SubCategory[]>;
}