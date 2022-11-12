import { admin } from '../../../config/firebase';
import path from 'path';

const storage = admin.storage().bucket()

export class GoogleStorage {
	upload(file: any, folderName: String): Promise<String> {

		return new Promise((resolve, reject) => {
			const randomChar = Math.random().toString(36).substring(7)
            const time = new Date().getTime()
			const oldName = file.originalname
            const fileType = path.extname(oldName).toLowerCase()
            const fileName = `${randomChar}-${time}` + `${fileType}`
			const fileToUplaod = `${folderName}/${fileName}`

			const bucketFile = storage.file(fileToUplaod)

			const stream  = bucketFile.createWriteStream({
				metadata: {
					ccontentType: file.mimetype
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
