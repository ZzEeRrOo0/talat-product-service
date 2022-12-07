import { CategoriesRepository } from "../../interfaces/repositories/categories-repository";
import { UploadCategoryImageUseCase } from "../../interfaces/use-cases/categories/upload-category-image";

export class UploadCategoryImage implements UploadCategoryImageUseCase {
	categoriesRepository: CategoriesRepository;
	constructor($categoriesRepository: CategoriesRepository) {
		this.categoriesRepository = $categoriesRepository;
	}
	async execute(file: string, folderName: string): Promise<string> {
		const result = await this.categoriesRepository.uploadCategoryImage(
			file,
			folderName
		);
		return result;
	}
}
