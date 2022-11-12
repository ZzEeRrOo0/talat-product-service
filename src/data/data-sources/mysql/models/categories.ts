import { Categories } from './../../../../domain/entities/categories';

export class CategoriesModel implements Categories {
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
