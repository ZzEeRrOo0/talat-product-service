import { RestaurantRepository } from "../../interfaces/repositories/restaurant-repository"
import { AddRestaurantUseCase } from "../../interfaces/use-cases/restaurant/add-restaurant"



export class AddRestaurant implements AddRestaurantUseCase {
    restaurantRepository: RestaurantRepository
    constructor(restaurantRepository: RestaurantRepository) {
        this.restaurantRepository = restaurantRepository
    }

    async execute(customer_id: number): Promise<number> {
        const result = await this.restaurantRepository.AddRestaurant(customer_id)
        return result
    }
}