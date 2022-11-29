
export class ProductImage {
    productID: string
    imagePath: string;

    constructor($productID: string, $imagePath: string) {
        this.productID = $productID;
        this.imagePath = $imagePath;
    }
}
