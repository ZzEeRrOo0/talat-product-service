import { SubCategoryDataSource } from "../../data/interfaces/data-sources/mysql/sub-category-data-source";
import { SubCategory } from "../entities/sub-category";
import { SubCategoryRepository } from "../interfaces/repositories/sub-category-repository";

export class SubCategoryRepositoryImpl implements SubCategoryRepository {
    subCategoryDataSource: SubCategoryDataSource
    constructor(subCategoryDataSource: SubCategoryDataSource) {
        this.subCategoryDataSource = subCategoryDataSource
    }

    async getAllByCategoryId(categoryId: string): Promise<SubCategory[]> {
        const result = await this.subCategoryDataSource.getAllById(categoryId)
        return result;
    }
}