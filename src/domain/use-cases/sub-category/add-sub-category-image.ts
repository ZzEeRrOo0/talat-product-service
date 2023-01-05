import { ProductImage } from "../../entities/product-image";
import { SubCategoryRepository } from "../../interfaces/repositories/sub-category-repository";
import { AddSubCategoryImageUseCase } from "../../interfaces/use-cases/sub-category/add-sub-category-image";


export class AddSubCategoryImage implements AddSubCategoryImageUseCase {
    subCategoryRepository: SubCategoryRepository;
    constructor(subCategoryRepository: SubCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async execute(imageParams: ProductImage): Promise<string> {
        const result = await this.subCategoryRepository.addSubCategoryImage(
            imageParams
        );
        return result;
    }
}
