export interface UpdateProductStatusUseCase {
    execute(productId: string, productStatus: number): Promise<string>;
}