export interface CloudinaryDataSource {
	uploadImage(file: string, folderName: string): Promise<string>;
}