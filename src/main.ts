import server from "./server";
import * as dotenv from "dotenv";
import { ProductMiddleWare } from "./presentation/routers/middle-ware/middle-ware";

dotenv.config();

(async () => {
	// server.use("/contact", contactMiddleWare);
	server.use("/products", ProductMiddleWare);
	server.listen(process.env.PORT, () => console.log("Running on server"));
})();
