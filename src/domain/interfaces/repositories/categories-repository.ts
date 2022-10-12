import { Categories } from "../../entities/categories";
export interface CategoriesRepository {
    getCategories(): Promise<Categories[]>;
}