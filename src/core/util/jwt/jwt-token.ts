import path from "path";
import { UserToken } from "../../../domain/entities/user-token";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

var fs = require("fs");

const privateKey = fs.readFileSync(
	path.join(__dirname, "../../../../private.key")
);
const publicKey = fs.readFileSync(
	path.join(__dirname, "../../../../public.pem")
);

export interface JsonWebTokenService {
	generateToken(name: string, phone: string): Promise<UserToken>;
	verifyAccessToken(req: Request, res: Response, next: NextFunction): void;
	verifyRefreshToken(refreshToken: string): Promise<UserToken>;
}

export class JsonWebTokenServiceImpl implements JsonWebTokenService {
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

	verifyAccessToken(req: Request, res: Response, next: NextFunction): void {
		try {
			let authHeader = req.headers["authorization"] as string;
			let userHeader = req.headers["x-user-id"] ?? null;

			console.log(req.headers);

			if (authHeader?.startsWith("Bearer ") && userHeader != null) {
				const token = authHeader!.substring(7, authHeader!.length);

				jwt.verify(token, publicKey, async (err, decoded) => {
					if (err) {
						res.status(400).json({ message: "Bad Request." });
					}

					next();
				});
			} else {
				res.status(400).json({ message: "Unauthorize." });
			}
		} catch (err) {
			res.status(500).json({ message: "Internal server error." });
		}
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
