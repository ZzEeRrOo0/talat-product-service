import { SubCategoryRepository } from "../../interfaces/repositories/sub-category-repository";
import { UploadSubCategoryImageUseCase } from "../../interfaces/use-cases/sub-category/upload-image";

export class UploadSubCategoryImage implements UploadSubCategoryImageUseCase {
    subCategoryRepository: SubCategoryRepository;
    constructor(subCategoryRepository: SubCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async execute(file: string, folderName: string): Promise<string> {
        const result = await this.subCategoryRepository.uploadSubCategoryImage(
            file,
            folderName
        );
        return result;
    }
}
