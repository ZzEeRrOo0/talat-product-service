import server from "./server";
import * as dotenv from "dotenv";
import {
	CategoriesMiddleWare,
	ProductMiddleWare,
	ProductSizeTypeMiddleWare,
	ProductTypeMiddleWare,
	SubCategoryMiddleWare,
	UserMiddleWare,
	SignInMiddleWare,
	SearchMiddleWare,
	RefreshTokenMiddleWare,
	RestuarantMiddleWare,
	OrderMiddleWare,
	JsonWebTokenServiceMiddleWare,
	AdminMiddleWare,
	PaymentMiddleWare,
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
	server.use(API_BASE_URL + "/sign-in", SignInMiddleWare);
	server.use(API_BASE_URL + "/refresh-token", RefreshTokenMiddleWare);
	server.use(API_BASE_URL + "/search", SearchMiddleWare);
	server.use(
		API_BASE_URL + "/restaurants",
		JsonWebTokenServiceMiddleWare.verifyAccessToken,
		RestuarantMiddleWare
	);
	server.use(
		API_BASE_URL + "/orders",
		JsonWebTokenServiceMiddleWare.verifyAccessToken,
		OrderMiddleWare
	);
	server.use(API_BASE_URL + "/admins", AdminMiddleWare);
	server.use(API_BASE_URL + "/payments", PaymentMiddleWare);
	server.listen(process.env.PORT, () => console.log("Running on server"));
})();
