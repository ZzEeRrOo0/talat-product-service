import server from "./server";
import * as dotenv from "dotenv";
import { CategoriesMiddleWare, ProductMiddleWare, ProductSizeTypeMiddleWare, ProductTypeMiddleWare, SubCategoryMiddleWare } from "./presentation/routers/middle-ware/middle-ware";
import { API_BASE_URL } from "../config/constants";

dotenv.config();

(async () => {
	// server.use("/contact", contactMiddleWare);
	server.use(API_BASE_URL + "/products", ProductMiddleWare);
	server.use(API_BASE_URL + "/categories", CategoriesMiddleWare);
	server.use(API_BASE_URL + "/sub-category", SubCategoryMiddleWare);
	server.use(API_BASE_URL + "/product-size-type", ProductSizeTypeMiddleWare);
	server.use(API_BASE_URL + "/product-type", ProductTypeMiddleWare);
	server.listen(process.env.PORT, () => console.log("Running on server"));
})();
