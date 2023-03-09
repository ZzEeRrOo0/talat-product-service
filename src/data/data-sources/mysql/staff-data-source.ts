import { StaffDataSource } from "../../interfaces/data-sources/mysql/staff-data-source";
import { StaffModel } from "./models/staff";
import { user_db } from "../../../../config/database";
import { OkPacket, RowDataPacket } from "mysql2";
import { Staff } from "../../../domain/entities/staff";

export class StaffDataSourceImpl implements StaffDataSource {
	createStaff(staff: StaffModel): Promise<number> {
		const sql = "INSERT INTO staffs (user_id, staff_role_id) VALUES(?, ?)";

		return new Promise((resolve, reject) => {
			user_db.query(
				sql,
				[staff.user_id, staff.staff_role_id],
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

	getStaffByUserId(userId: number): Promise<Staff | null> {
		const sql = "SELECT * FROM staffs WHERE user_id = ?";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [userId], (error, result) => {
				if (error) {
					throw new Error("Internal server error.");
				}
				const data = <RowDataPacket>result;

				if (data.length > 0) {
					const staff = new StaffModel(
						data[0]["user_id"],
						data[0]["staff_role_id"],
						data[0]["id"]
					);

					resolve(staff);
				} else {
					resolve(null);
				}
			});
		});
	}
}
