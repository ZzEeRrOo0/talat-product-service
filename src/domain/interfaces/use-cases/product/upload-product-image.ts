export interface UploadProductImageUseCase {
	execute(file: string, folderName: string): Promise<string>;
}