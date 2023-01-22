import { CreateRestaurantDetail } from "../../entities/create-restaurant-detail";


export interface RestaurantRepository {

    AddRestaurant(customer_id: number): Promise<number>;
    AddRestaurantDetail(restaurant_details: CreateRestaurantDetail): Promise<number>;

}