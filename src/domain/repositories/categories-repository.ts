import { CategoriesDataSource } from "../../data/interfaces/data-sources/mysql/categories-data-source";
import { Categories } from "../entities/categories";
import { CategoriesRepository } from "../interfaces/repositories/categories-repository";
import { CloudinaryDataSource } from "../../data/interfaces/data-sources/cloudinary/cloudinary-data-source";

export class CategoriesRepositoryImpl implements CategoriesRepository {
	categoriesDataSource: CategoriesDataSource;
	cloudinaryDataSource: CloudinaryDataSource;
	constructor(
		$categoriesDataSource: CategoriesDataSource,
		$cloudinaryDataSource: CloudinaryDataSource
	) {
		this.categoriesDataSource = $categoriesDataSource;
		this.cloudinaryDataSource = $cloudinaryDataSource;
	}
	async uploadCategoryImage(file: string, folderName: string): Promise<string> {
		const result = await this.cloudinaryDataSource.uploadCategoryImage(
			file,
			folderName
		);
		return result;
	}

	async getCategories(): Promise<Categories[]> {
		const result = await this.categoriesDataSource.getAll();
		return result;
	}
}
