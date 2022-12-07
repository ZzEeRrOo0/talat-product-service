export interface CloudinaryDataSource {
	uploadCategoryImage(file: string, folderName: string): Promise<string>;
}