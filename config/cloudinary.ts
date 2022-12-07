import cloudinary from "cloudinary";
import cloudinaryKey from "../cloudinary-secret-key.json";

cloudinary.v2.config({
	cloud_name: cloudinaryKey.cloud_name,
	api_key: cloudinaryKey.api_key,
	api_secret: cloudinaryKey.api_secret_key,
	secure: true,
});

export { cloudinary }
