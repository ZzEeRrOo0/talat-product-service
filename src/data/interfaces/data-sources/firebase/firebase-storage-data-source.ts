export interface FirebaseStorageDataSource {
	uploadProductImage(file: any, folderName: string): Promise<string>;
	getUserByPhoneNumber(phone: string): Promise<boolean>;
}