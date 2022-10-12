import { Categories } from "../../entities/categories";
import { CategoriesRepository } from "../../interfaces/repositories/categories-repository";
import { GetAllCategoriesUseCase } from "../../interfaces/use-cases/categories/get-all-categories";

export class GetAllCategories implements GetAllCategoriesUseCase {
    categoriesRepository: CategoriesRepository
    constructor(categoriesRepository: CategoriesRepository) {
        this.categoriesRepository = categoriesRepository
    }

    async execute(): Promise<Categories[]> {
        const result = await this.categoriesRepository.getCategories()
        return result
    }
}