import server from "./server";
import * as dotenv from "dotenv";
import { ProductMiddleWare } from "./presentation/routers/middle-ware/middle-ware";
import { API_BASE_URL } from "../config/constants";

dotenv.config();

(async () => {
	// server.use("/contact", contactMiddleWare);
	server.use(API_BASE_URL + "/products", ProductMiddleWare);
	server.listen(process.env.PORT, () => console.log("Running on server"));
})();
