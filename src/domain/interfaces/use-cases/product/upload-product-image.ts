export interface UploadProductImageUseCase {
	execute(file: any, folderName: string): Promise<string>;
}