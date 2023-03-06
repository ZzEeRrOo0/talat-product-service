import { StaffDetailDataSource } from "../../interfaces/data-sources/mysql/staff-detail-data-source";
import { StaffDetailModel } from "./models/staff-detail";
import { user_db } from "../../../../config/database";
import { OkPacket, RowDataPacket } from "mysql2";
import { StaffDetail } from "../../../domain/entities/staff-detail";

export class StaffDetailDataSourceImpl implements StaffDetailDataSource {
	createStaffDetail(staffDetail: StaffDetailModel): Promise<number> {
		const sql =
			"INSERT INTO staff_details (staff_id, full_name, date_of_birth, gender, province_id, district, village) VALUES(?, ?, ?, ?, ?, ?, ?)";

		return new Promise((resolve, reject) => {
			user_db.query(
				sql,
				[
					staffDetail.staff_id,
					staffDetail.full_name,
					staffDetail.date_of_birth,
					staffDetail.gender,
					staffDetail.province_id,
					staffDetail.district,
					staffDetail.village,
				],
				(error, result) => {
					if (error) {
						// throw new Error("Internal server error.");
						console.log(error);
					}
					const insertId = (<OkPacket>result).insertId;
					resolve(insertId);
				}
			);
		});
	}

	getStaffDetailByUserId(userId: number): Promise<StaffDetail> {
		const sql =
			"SELECT std.staff_id, std.full_name, std.date_of_birth, std.gender, std.province_id, std.district, std.village " +
			"FROM users AS u " +
			"LEFT JOIN staff AS s ON s.user_id = u.id" +
			"LEFT JOIN staff_details AS std ON std.staff_id = s.id" +
			"WHERE u.id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [userId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}
				const data = <RowDataPacket>result;

				const staffDetail = new StaffDetailModel(
					data[0]["staff_id"],
					data[0]["full_name"],
					data[0]["date_of_birth"],
					data[0]["gender"],
					data[0]["province_id"],
					data[0]["district"],
					data[0]["village"]
				);

				resolve(staffDetail);
			});
		});
	}
}
