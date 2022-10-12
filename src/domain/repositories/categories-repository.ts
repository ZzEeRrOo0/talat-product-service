import { CategoriesDataSource } from "../../data/interfaces/data-sources/mysql/categories-data-source";
import { Categories } from "../entities/categories";
import { CategoriesRepository } from "../interfaces/repositories/categories-repository";

export class CategoriesRepositoryImpl implements CategoriesRepository {
    categoriesDataSource: CategoriesDataSource
    constructor(categoriesDataSource: CategoriesDataSource) {
        this.categoriesDataSource = categoriesDataSource
    }

    async getCategories(): Promise<Categories[]> {
        const result = await this.categoriesDataSource.getAll()
        return result;
    }
}