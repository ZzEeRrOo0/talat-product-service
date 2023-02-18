import { StaffDataSource } from "../../interfaces/data-sources/mysql/staff-data-source";
import { StaffModel } from "./models/staff";
import { user_db } from "../../../../config/database";
import { OkPacket } from "mysql2";

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
}
