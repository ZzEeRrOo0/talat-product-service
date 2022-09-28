import { Product } from "../../../entities/product"; 
export interface GetAllProductUseCase { 
    execute(): Promise<Product[]>; 
}