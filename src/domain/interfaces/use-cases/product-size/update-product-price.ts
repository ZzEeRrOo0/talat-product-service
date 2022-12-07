export interface UpdateProductPriceUseCase {
    execute(productId: string, productPrice: string): Promise<string>;
}