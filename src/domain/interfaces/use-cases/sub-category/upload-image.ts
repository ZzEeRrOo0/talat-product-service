export interface UploadSubCategoryImageUseCase {
    execute(file: string, folderName: string): Promise<string>;
}