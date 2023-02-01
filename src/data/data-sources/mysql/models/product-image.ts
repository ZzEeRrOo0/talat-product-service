import { ProductImage } from "../../../../domain/entities/product-image";

export class ProductImageModel implements ProductImage {
	productID: string;
	imagePath: string;
	constructor($productID: string, $imagePath: string) {
		this.productID = $productID;
		this.imagePath = $imagePath;
	}
}
