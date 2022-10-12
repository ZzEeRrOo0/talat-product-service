import { Categories } from './../../../../domain/entities/categories';

export interface CategoriesDataSource {
    getAll(): Promise<Categories[]>;
}