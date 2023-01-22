import { admin } from "../../../../config/firebase";

interface Authentication {
	verifyToken(token: string): Promise<boolean>;
}

export class AuthenticationImpl implements Authentication {
	verifyToken(token: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			admin
				.auth()
				.verifyIdToken(token)
				.then((decodeToken) => {
					admin
						.auth()
						.getUser(decodeToken.uid)
						.then((userRecord) => {
							resolve(true);
						})
						.catch((error) => {
							resolve(false);
						});
				})
				.catch((error) => {
					resolve(false);
				});
		});
	}
}
