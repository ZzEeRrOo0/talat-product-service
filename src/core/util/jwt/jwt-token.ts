import path from "path";
import { UserToken } from "../../../domain/entities/user-token";
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { APIResponse } from "../../response/api-response";
import { UserRepository } from "../../../domain/interfaces/repositories/user-repository";

var fs = require("fs");

const privateKey = fs.readFileSync(
	path.join(__dirname, "../../../../private.key")
);
const publicKey = fs.readFileSync(
	path.join(__dirname, "../../../../public.pem")
);

export interface JsonWebTokenService {
	generateToken(phone: string): Promise<UserToken>;
	verifyAccessToken(req: Request, res: Response, next: NextFunction): void;
}

export class JsonWebTokenServiceImpl implements JsonWebTokenService {
	userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	generateToken(phone: string): Promise<UserToken> {
		return new Promise((resolve, reject) => {
			try {
				const payload = {
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

				const userToken = new UserToken(accessToken, refreshToken);

				resolve(userToken);
			} catch (err) {
				reject(err);
			}
		});
	}

	verifyAccessToken(req: Request, res: Response, next: NextFunction) {
		try {
			let authHeader = req.headers["authorization"];

			if (authHeader?.startsWith("Bearer ")) {
				const token = authHeader!.substring(7, authHeader!.length);

				jwt.verify(token, publicKey, async (err, decoded) => {
					if (err) {
						res.send(
							new APIResponse(401, { message: "Unauthorized." })
						);
					}

					const isExistUser =
						await this.userRepository.getUserByPhoneNumberFromUserDB(
							decoded.phone
						);

					if (isExistUser) {
						next();
					} else {
						res.send(
							new APIResponse(401, { message: "Unauthorized." })
						);
					}
				});
			} else {
				res.send(
					new APIResponse(400, { token: req.header["authorization"] })
				);
			}
		} catch (err) {
			res.send(
				new APIResponse(500, { message: "Internal server error." })
			);
		}
	}
}
