import express from "express";
import cors from "cors";

//get router
var router = express.Router();

//options for cors midddleware
const options: cors.CorsOptions = {
	allowedHeaders: [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"X-Access-Token",
	],
	credentials: true,
	methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
	origin: "*",
	preflightContinue: false,
};

const server = express();
server.use(express.json());
router.use(cors(options));
router.options("*", cors(options));
export default server;
