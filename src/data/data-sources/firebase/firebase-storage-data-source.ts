import { FirebaseStorageDataSource } from "../../interfaces/data-sources/firebase/firebase-storage-data-source";
import { GoogleStorage } from "../../../core/upload/google-storage";
import { AuthenticationService } from "../../../core/util/authentication";

export class FirebaseStorageDataSourceImpl
	implements FirebaseStorageDataSource
{
	googleStorage: GoogleStorage;
	authenticationService: AuthenticationService;

	constructor(
		$googleStorage: GoogleStorage,
		$authenticationService: AuthenticationService
	) {
		this.googleStorage = $googleStorage;
		this.authenticationService = $authenticationService;
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

	getUserByPhoneNumber(phone: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const checkPhoneNumber =
				this.authenticationService.getUserByPhoneNumber(phone);

			checkPhoneNumber
				.then((isExist) => {
					resolve(isExist);
				})
				.catch((err) => {
					throw new Error(err);
				});
		});
	}
}
