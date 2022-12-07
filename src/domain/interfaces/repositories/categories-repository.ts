import { Categories } from "../../entities/categories";
export interface CategoriesRepository {
    getCategories(): Promise<Categories[]>;
	uploadCategoryImage(file: string, folderName: string): Promise<string>;
}