import { OkPacket, RowDataPacket } from "mysql2";
import { user_db } from "../../../../config/database";
import { RestaurantDataSource } from "../../interfaces/data-sources/mysql/restaurant-data-source";
import { RestaurantDetailModel } from "./models/restuarant-detail";

export class RestaurantDataSourceImpl implements RestaurantDataSource {
	getRestaurantDetailByCustomerId(
		customerId: number
	): Promise<RestaurantDetailModel | null> {
		const sql =
			"SELECT * FROM restaurant_details AS rd " +
			"JOIN restaurants AS r on r.id=rd.restaurant_id " +
			"WHERE r.customer_id=? AND r.deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [customerId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}
				const data = <RowDataPacket>result;
				if (data.length > 0) {
					const restaurantDetail = new RestaurantDetailModel(
						data[0]["name"],
						data[0]["restaurant_id"],
						data[0]["restaurant_type_id"],
						data[0]["restaurant_purchase_order_id"],
						data[0]["restaurant_branch_id"],
						data[0]["location"]
					);

					resolve(restaurantDetail);
				} else {
					resolve(null);
				}
			});
		});
	}

	createRestaurantDetail(
		restaurantDetails: RestaurantDetailModel
	): Promise<number> {
		const sql =
			"INSERT INTO restaurant_details ( name,restaurant_id,restaurant_type_id,restaurant_purchase_order_id,restaurant_branch_id,location) VALUES(?,?,?,?,?,?)";

		return new Promise((resolve, reject) => {
			user_db.query(
				sql,
				[
					restaurantDetails.name,
					restaurantDetails.restaurant_id,
					restaurantDetails.restaurant_type_id,
					restaurantDetails.restaurant_purchase_order_id,
					restaurantDetails.restaurant_branch_id,
					restaurantDetails.location,
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
	createRestaurant(customerId: number): Promise<number> {
		const sql = "INSERT INTO restaurants ( customer_id) VALUES(?)";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [customerId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}
				const insertId = (<OkPacket>result).insertId;
				resolve(insertId);
			});
		});
	}
}
