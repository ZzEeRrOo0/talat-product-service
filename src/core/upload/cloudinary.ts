import { cloudinary } from "../../../config/cloudinary";

export class Cloudinary {
	upload(file: string, folderName: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const randomChar = Math.random().toString(36).substring(7);
			const time = new Date().getTime();
			const fileName = `${randomChar}-${time}`;

			cloudinary.v2.uploader.upload(
				file,
				{ folder: folderName, public_id: fileName },
				function (error, result) {
					if (error) {
						reject(error);
					}

					resolve(result!.secure_url);
				}
			);
		});
	}
}
