import { admin } from "../../../../config/firebase";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../../../config/constants";

export interface AuthenticationService {
	verifyToken(token: string): Promise<boolean>;
	getUserByPhoneNumber(phone: string): Promise<boolean>;
	encryptPassword(password: string): Promise<string>;
	decryptPassword(password: string, hash: string): Promise<boolean>;
}

export class AuthenticationServiceImpl implements AuthenticationService {
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

	getUserByPhoneNumber(phone: string): Promise<boolean> {
		return new Promise((reslove, reject) => {
			admin
				.auth()
				.getUserByPhoneNumber(phone)
				.then((userRecord) => {
					if (userRecord) {
						reslove(true);
					}
				})
				.catch((error) => {
					if (error.code === "auth/user-not-found") {
						reslove(false);
					}
				});
		});
	}

	encryptPassword(password: string): Promise<string> {
		return new Promise((reslove, reject) => {
			bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
				if (error) {
					reject(error);
				} else {
					reslove(hash);
				}
			});
		});
	}

	decryptPassword(password: string, hash: string): Promise<boolean> {
		return new Promise((reslove, reject) => {
			bcrypt.compare(password, hash, (error, result) => {
				if (error) {
					reject(false);
				} else {
					reslove(result);
				}
			});
		});
	}
}
