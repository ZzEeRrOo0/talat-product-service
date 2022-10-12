import server from "./server";
import * as dotenv from "dotenv";
import { CategoriesMiddleWare, ProductMiddleWare } from "./presentation/routers/middle-ware/middle-ware";
import { API_BASE_URL } from "../config/constants";

dotenv.config();

(async () => {
	// server.use("/contact", contactMiddleWare);
	server.use(API_BASE_URL + "/products", ProductMiddleWare);
	server.use(API_BASE_URL + "/categories", CategoriesMiddleWare);
	server.listen(process.env.PORT, () => console.log("Running on server"));
})();
