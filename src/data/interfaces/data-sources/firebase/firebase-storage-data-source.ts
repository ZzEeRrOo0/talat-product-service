export interface FirebaseStorageDataSource {
	uploadProductImage(file: any, folderName: String): Promise<String>;
}