import { Categories } from './../../../../domain/entities/categories';

export class CategoriesModel implements Categories {
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
