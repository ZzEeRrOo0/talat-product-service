import { CloudinaryDataSource } from "../../data/interfaces/data-sources/cloudinary/cloudinary-data-source";
import { SubCategoryDataSource } from "../../data/interfaces/data-sources/mysql/sub-category-data-source";
import { ProductImage } from "../entities/product-image";
import { SubCategory } from "../entities/sub-category";
import { SubCategoryRepository } from "../interfaces/repositories/sub-category-repository";

export class SubCategoryRepositoryImpl implements SubCategoryRepository {
    subCategoryDataSource: SubCategoryDataSource;
    cloudinaryDataSource: CloudinaryDataSource;
    constructor(
        $subCategoryDataSource: SubCategoryDataSource,
        $cloudinaryDataSource: CloudinaryDataSource,
    ) {
        this.subCategoryDataSource = $subCategoryDataSource;
        this.cloudinaryDataSource = $cloudinaryDataSource;

    }
    async addSubCategoryImage(imageParams: ProductImage): Promise<string> {
        const result = await this.subCategoryDataSource.addSubCategoryImage(
            imageParams
        );
        return result;
    }

    async uploadSubCategoryImage(file: string, folderName: string): Promise<string> {
        const result = await this.cloudinaryDataSource.uploadImage(
            file,
            folderName
        );
        return result;
    }

    async getAllByCategoryId(categoryId: string): Promise<SubCategory[]> {
        const result = await this.subCategoryDataSource.getAllById(categoryId)
        return result;
    }
}