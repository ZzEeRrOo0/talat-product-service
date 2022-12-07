export interface UploadCategoryImageUseCase {
	execute(file: string, folderName: string): Promise<string>;
}
