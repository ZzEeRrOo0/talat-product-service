import { SubCategory } from "../../../../domain/entities/sub-category";

export class SubCategoryModel implements SubCategory {
    id: number;
    name!: string;
    category_id: number;

    constructor(
        id: number,
        name: string,
        category_id: number
    ) {
        (this.id = id),
            (this.name = name),
            (this.category_id = category_id)
    }
}
