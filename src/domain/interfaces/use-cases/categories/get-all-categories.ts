import { Categories } from "../../../entities/categories";
export interface GetAllCategoriesUseCase {
    execute(): Promise<Categories[]>;
}