import { SubCategory } from "../../../../domain/entities/sub-category";

export class SubCategoryModel implements SubCategory {
	id: number;
	name!: string;
	category_id: number;
	image_url: string;

	constructor(
		id: number,
		name: string,
		category_id: number,
		image_url: string
	) {
		(this.id = id),
			(this.name = name),
			(this.category_id = category_id),
			(this.image_url = image_url);
	}
}
