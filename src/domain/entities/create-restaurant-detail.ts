export class CreateRestaurantDetail {
    name: string;
    restaurant_id: number;
    restaurant_type_id: number;
    restaurant_purchase_order_id: number;
    restaurant_branch_id: number;
    location: string;

    constructor(
        name: string,
        restaurant_id: number,
        restaurant_type_id: number,
        restaurant_purchase_order_id: number,
        restaurant_branch_id: number,
        location: string,
    ) {
        this.name = name;
        this.restaurant_id = restaurant_id;
        this.restaurant_type_id = restaurant_type_id;
        this.restaurant_purchase_order_id = restaurant_purchase_order_id;
        this.restaurant_branch_id = restaurant_branch_id;
        this.location = location;
    }
} 