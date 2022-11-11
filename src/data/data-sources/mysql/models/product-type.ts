import { ProductType } from "../../../../domain/entities/product-type";


export class ProductTypeModel implements ProductType {
    id: number;
    name: String;
    sub_category_id: number;

    constructor(
        id: number,
        name: String,
        sub_category_id: number
    ) {
        (this.id = id),
            (this.name = name),
            (this.sub_category_id = sub_category_id)
    }
}
