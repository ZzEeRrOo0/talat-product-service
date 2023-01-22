import { RestaurantDataSource } from "../../data/interfaces/data-sources/mysql/restaurant-data-source";
import { CreateRestaurantDetail } from "../entities/create-restaurant-detail";
import { RestaurantRepository } from "../interfaces/repositories/restaurant-repository"


export class RestaurantRepositoryImpl implements RestaurantRepository {
    restaurantDataSource: RestaurantDataSource
    constructor(restaurantDataSource: RestaurantDataSource) {
        this.restaurantDataSource = restaurantDataSource
    }
    async AddRestaurantDetail(restaurant_details: CreateRestaurantDetail): Promise<number> {
        const result = await this.restaurantDataSource.createRestaurantDetail(
            restaurant_details
        );
        return result;
    }
    async AddRestaurant(customer_id: number): Promise<number> {
        const result = await this.restaurantDataSource.createRestaurant(
            customer_id
        );
        return result;
    }
}