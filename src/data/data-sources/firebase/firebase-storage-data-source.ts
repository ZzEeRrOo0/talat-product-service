import { FirebaseStorageDataSource } from "../../interfaces/data-sources/firebase/firebase-storage-data-source";
import { GoogleStorage } from "../../../core/upload/google-storage";

export class FirebaseStorageDataSourceImpl
	implements FirebaseStorageDataSource {
	googleStorage: GoogleStorage;

	constructor($googleStorage: GoogleStorage) {
		this.googleStorage = $googleStorage;
	}

	uploadProductImage(file: any, folderName: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const upload = this.googleStorage.upload(file, folderName);

			upload
				.then((imageName) => {
					resolve(imageName);
				})
				.catch((err) => {
					throw new Error(err);
				});
		});
	}
}
