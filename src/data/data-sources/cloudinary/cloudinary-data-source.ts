import { CloudinaryDataSource } from "../../interfaces/data-sources/cloudinary/cloudinary-data-source";
import { Cloudinary } from "../../../core/upload/cloudinary";

export class CloudinaryDataSourceImpl implements CloudinaryDataSource {
	cloudinary: Cloudinary;
	constructor($cloudinary: Cloudinary) {
		this.cloudinary = $cloudinary;
	}

	uploadImage(file: string, folderName: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const upload = this.cloudinary.upload(file, folderName);

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
