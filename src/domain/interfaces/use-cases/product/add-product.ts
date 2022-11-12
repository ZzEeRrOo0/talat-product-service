import { Product } from "../../../entities/product";
export interface AddProductUseCase {
    execute(product: Product): Promise<number>;
}
