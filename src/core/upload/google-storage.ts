import { admin } from '../../../config/firebase';
import path from 'path';

const storage = admin.storage().bucket()

export class GoogleStorage {
	upload(file: any, folderName: string): Promise<string> {

		return new Promise((resolve, reject) => {
			const randomChar = Math.random().toString(36).substring(7)
			const time = new Date().getTime()
			const oldName = file.originalname
			const fileType = path.extname(oldName).toLowerCase()
			const fileName = `${randomChar}-${time}` + `${fileType}`
			const fileToUpload = `${folderName}/${fileName}`

			const bucketFile = storage.file(fileToUpload)

			const stream = bucketFile.createWriteStream({
				metadata: {
					contentType: file.mimetype
				},
				resumable: false
			})

			stream.on('error', err => {
				reject(err)
			})

			stream.on('finish', () => {
				resolve(fileName)
			})

			stream.end(file.buffer)
		})

	}
}
