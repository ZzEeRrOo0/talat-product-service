export interface DeleteProductUseCase {
	execute(productId: string): Promise<boolean>;
}
