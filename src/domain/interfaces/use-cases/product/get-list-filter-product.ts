import { FilterProduct } from "../../../entities/filter-product";

export interface GetListFilterProductUseCase {
	execute(name: string): Promise<FilterProduct[]>;
}
