import { OkPacket } from "mysql2";
import { user_db } from "../../../../config/database";
import { CreateRestaurantDetail } from "../../../domain/entities/create-restaurant-detail";
import { RestaurantDataSource } from "../../interfaces/data-sources/mysql/restaurant-data-source";

export class RestaurantDataSourceImpl implements RestaurantDataSource {

    createRestaurantDetail(restaurant_details: CreateRestaurantDetail): Promise<number> {
        const sql =
            "INSERT INTO restaurant_details ( name,restaurant_id,restaurant_type_id,restaurant_purchase_order_id,restaurant_branch_id,location) VALUES(?,?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            user_db.query(
                sql,
                [
                    restaurant_details.name,
                    restaurant_details.restaurant_id,
                    restaurant_details.restaurant_type_id,
                    restaurant_details.restaurant_purchase_order_id,
                    restaurant_details.restaurant_branch_id,
                    restaurant_details.location,
                ],
                (error, result) => {
                    if (error) {
                        throw new Error("Internal server error.");
                    }
                    const insertId = (<OkPacket>result).insertId;
                    resolve(insertId);
                }
            );
        });
    }
    createRestaurant(customer_id: number): Promise<number> {
        const sql =
            "INSERT INTO restaurants ( customer_id) VALUES(?)";

        return new Promise((resolve, reject) => {
            user_db.query(
                sql,
                [
                    customer_id
                ],
                (error, result) => {
                    if (error) {
                        throw new Error("Internal server error.");
                    }
                    const insertId = (<OkPacket>result).insertId;
                    resolve(insertId);
                }
            );
        });
    }


}