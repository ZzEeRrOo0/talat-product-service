import path from "path";
import { UserToken } from "../../../domain/entities/user-token";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UserRepository } from "../../../domain/interfaces/repositories/user-repository";

var fs = require("fs");

const privateKey = fs.readFileSync(
	path.join(__dirname, "../../../../private.key")
);
const publicKey = fs.readFileSync(
	path.join(__dirname, "../../../../public.pem")
);

export interface JsonWebTokenService {
	generateToken(name: string, phone: string): Promise<UserToken>;
	verifyAccessToken(req: Request): Promise<boolean>;
	verifyRefreshToken(refreshToken: string): Promise<UserToken>;
}

export class JsonWebTokenServiceImpl implements JsonWebTokenService {
	userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	generateToken(name: string, phone: string): Promise<UserToken> {
		return new Promise((resolve, reject) => {
			try {
				const payload = {
					name: name,
					phone: phone,
				};

				const accessToken = jwt.sign(payload, privateKey, {
					algorithm: "RS256",
					expiresIn: "1d",
				});

				const refreshToken = jwt.sign(payload, privateKey, {
					algorithm: "RS256",
					expiresIn: "30d",
				});

				const userToken = new UserToken(
					name,
					accessToken,
					refreshToken
				);

				resolve(userToken);
			} catch (err) {
				reject(err);
			}
		});
	}

	verifyAccessToken(req: Request): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				let authHeader = req.headers["authorization"];

				if (authHeader?.startsWith("Bearer ")) {
					const token = authHeader!.substring(7, authHeader!.length);

					jwt.verify(token, publicKey, async (err, decoded) => {
						if (err) {
							resolve(false);
						}

						const isExistUser =
							await this.userRepository.getUserByPhoneNumberFromUserDB(
								decoded.phone
							);

						if (isExistUser) {
							resolve(true);
						} else {
							resolve(false);
						}
					});
				} else {
					resolve(false);
				}
			} catch (err) {
				resolve(false);
			}
		});
	}

	verifyRefreshToken(refreshToken: string): Promise<UserToken> {
		return new Promise((resolve, reject) => {
			jwt.verify(refreshToken, publicKey, async (err, decoded) => {
				if (err) {
					reject(err);
				}

				const payload = {
					name: decoded.name,
					phone: decoded.phone,
				};

				const accessToken = jwt.sign(payload, privateKey, {
					algorithm: "RS256",
					expiresIn: "1d",
				});

				resolve(new UserToken(decoded.name, accessToken, refreshToken));
			});
		});
	}
}
