export interface UploadProductImageUseCase {
	execute(file: any, folderName: String): Promise<String>;
}