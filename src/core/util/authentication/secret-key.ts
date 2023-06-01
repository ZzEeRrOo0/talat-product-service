import * as crypto from "crypto";
import * as fs from "fs";

const secretKeyFilePath = "secret-key.txt";

export function generateSecretKey(): Buffer {
	return crypto.randomBytes(32);
}

export function getSecretKey(): Buffer {
	if (fs.existsSync(secretKeyFilePath)) {
		const keyData = fs.readFileSync(secretKeyFilePath);
		return Buffer.from(keyData.toString(), "hex");
	} else {
		const secretKey = generateSecretKey();
		fs.writeFileSync(secretKeyFilePath, secretKey.toString("hex"));
		return secretKey;
	}
}
