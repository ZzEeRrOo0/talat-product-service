import { CreateRestaurantDetail } from "../../../../domain/entities/create-restaurant-detail";

export interface RestaurantDataSource {
    createRestaurant(customer_id: number): Promise<number>;
    createRestaurantDetail(restaurant_details: CreateRestaurantDetail): Promise<number>;
}