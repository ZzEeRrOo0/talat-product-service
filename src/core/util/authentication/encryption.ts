import * as crypto from "crypto";
import { getSecretKey } from "./secret-key";

export function encrypt(data: string): string {
	const secretKey = getSecretKey();
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
	let encrypted = cipher.update(data, "utf8", "hex");
	encrypted += cipher.final("hex");
	return iv.toString("hex") + encrypted;
}
