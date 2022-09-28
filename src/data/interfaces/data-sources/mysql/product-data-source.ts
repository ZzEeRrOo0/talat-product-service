import { Product } from "../../../../domain/entities/product";

export interface ProductDataSource {
    create(product: Product): Promise<number>;
    getAll(): Promise<Product[]>;
}