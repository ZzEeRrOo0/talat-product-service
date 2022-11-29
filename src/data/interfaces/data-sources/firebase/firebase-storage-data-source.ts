export interface FirebaseStorageDataSource {
	uploadProductImage(file: any, folderName: string): Promise<string>;
}