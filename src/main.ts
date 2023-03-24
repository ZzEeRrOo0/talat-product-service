import server from "./server";
import * as dotenv from "dotenv";
import {
	CategoriesMiddleWare,
	ProductMiddleWare,
	ProductSizeTypeMiddleWare,
	ProductTypeMiddleWare,
	SubCategoryMiddleWare,
	UserMiddleWare,
	SignInRouterMiddleWare,
	SearchRouterMiddleWare,
	RefreshTokenRouterMiddleWare,
	RestuarantRouterMiddleWare,
} from "./presentation/routers/middle-ware/middle-ware";
import { API_BASE_URL } from "../config/constants";

dotenv.config();

(async () => {
	// server.use("/contact", contactMiddleWare);
	server.use(API_BASE_URL + "/products", ProductMiddleWare);
	server.use(API_BASE_URL + "/categories", CategoriesMiddleWare);
	server.use(API_BASE_URL + "/sub-categories", SubCategoryMiddleWare);
	server.use(API_BASE_URL + "/product-size-types", ProductSizeTypeMiddleWare);
	server.use(API_BASE_URL + "/product-types", ProductTypeMiddleWare);
	server.use(API_BASE_URL + "/users", UserMiddleWare);
	server.use(API_BASE_URL + "/sign-in", SignInRouterMiddleWare);
	server.use(API_BASE_URL + "/refresh-token", RefreshTokenRouterMiddleWare);
	server.use(API_BASE_URL + "/search", SearchRouterMiddleWare);
	server.use(API_BASE_URL + "/restaurants", RestuarantRouterMiddleWare);
	server.listen(process.env.PORT, () => console.log("Running on server"));
})();
