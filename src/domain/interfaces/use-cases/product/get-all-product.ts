import { AllProduct } from '../../../entities/all-product';
export interface GetAllProductUseCase { 
    execute(currentPage: number | 1, pageSize: number): Promise<AllProduct>; 
}