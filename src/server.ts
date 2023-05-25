import express from "express";
import cors from "cors";

//options for cors midddleware
const options: cors.CorsOptions = {
	allowedHeaders: [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"X-Access-Token",
		"Authorization",
		"X-User-Id",
		"X-User-Type-Id",
	],
	credentials: true,
	methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
	origin: "*",
	preflightContinue: false,
};

const server = express();
server.use(express.json());
server.use(cors(options));
server.options("*", cors(options));
export default server;
