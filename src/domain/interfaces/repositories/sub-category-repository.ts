import { SubCategory } from './../../entities/sub-category';
export interface SubCategoryRepository {
    getAllByCategoryId(category_id: string): Promise<SubCategory[]>;
}