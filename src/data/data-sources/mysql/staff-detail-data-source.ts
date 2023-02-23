import { StaffDetailDataSource } from "../../interfaces/data-sources/mysql/staff-detail-data-source";
import { StaffDetailModel } from "./models/staff-detail";
import { user_db } from "../../../../config/database";
import { OkPacket } from "mysql2";

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
						console.log(error)
					}
					const insertId = (<OkPacket>result).insertId;
					resolve(insertId);
				}
			);
		});
	}
}
