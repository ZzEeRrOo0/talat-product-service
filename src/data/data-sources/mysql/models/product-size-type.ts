import { ProductSizeType } from "../../../../domain/entities/product-size-type";


export class ProductSizeTypeModel implements ProductSizeType {
    id: number;
    name!: String;

    constructor(
        id: number,
        name: String,
    ) {
        (this.id = id),
            (this.name = name)
    }
}
