import { SubCategory } from "../../entities/sub-category"
import { SubCategoryRepository } from "../../interfaces/repositories/sub-category-repository"
import { GetAllByCategoryIdUseCase } from "../../interfaces/use-cases/sub-category/get-all-by-category-id"

export class GetAllByCategoryId implements GetAllByCategoryIdUseCase {
    subCategoryRepository: SubCategoryRepository
    constructor(subCategoryRepository: SubCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository
    }

    async execute(categoryId: string): Promise<SubCategory[]> {
        const result = await this.subCategoryRepository.getAllByCategoryId(categoryId);
        return result
    }
}