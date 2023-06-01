import * as crypto from "crypto";
import { getSecretKey } from "./secret-key";

export function decrypt(encryptedData: string): string {
	const secretKey = getSecretKey();
	const iv = Buffer.from(encryptedData.slice(0, 32), "hex");
	const encryptedText = encryptedData.slice(32);
	const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
	let decrypted = decipher.update(encryptedText, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}
