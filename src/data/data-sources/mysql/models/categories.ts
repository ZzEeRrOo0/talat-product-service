import { Categories } from './../../../../domain/entities/categories';

export class CategoriesModel implements Categories {
    id: number;
    name!: string;
	image_url!: string;

    constructor(
        id: number,
        name: string,
		image_url: string,
    ) {
        (this.id = id),
            (this.name = name),
			(this.image_url = image_url)
    }
}
