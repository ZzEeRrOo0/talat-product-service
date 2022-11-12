import { ProductSizeType } from "../../../../domain/entities/product-size-type";


export class ProductSizeTypeModel implements ProductSizeType {
    id: number;
    name!: string;

    constructor(
        id: number,
        name: string,
    ) {
        (this.id = id),
            (this.name = name)
    }
}
