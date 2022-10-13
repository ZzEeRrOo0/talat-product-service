import { SubCategory } from "../../../entities/sub-category";
export interface GetAllByCategoryIdUseCase {
    execute(categoryId: string): Promise<SubCategory[]>;
}