import { ProductImage } from '../../entities/product-image';
import { SubCategory } from './../../entities/sub-category';
export interface SubCategoryRepository {
    getAllByCategoryId(category_id: string): Promise<SubCategory[]>;
    uploadSubCategoryImage(file: string, folderName: string): Promise<string>;
    addSubCategoryImage(imageParams: ProductImage): Promise<string>;
}