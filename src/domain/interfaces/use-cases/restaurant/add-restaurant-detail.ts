import { CreateRestaurantDetail } from "../../../entities/create-restaurant-detail";

export interface AddRestaurantDetailUseCase {
    execute(restaurant_details: CreateRestaurantDetail): Promise<number>;
}