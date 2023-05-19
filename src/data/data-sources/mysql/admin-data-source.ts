import { user_db } from "../../../../config/database";
import { OkPacket, RowDataPacket } from "mysql2";
import { AdminDataSource } from "../../interfaces/data-sources/mysql/admjn-data-source";
import { Admin } from "../../../domain/entities/admin";
import { AdminModel } from "./models/admin";

export class AdminDataSourceImpl implements AdminDataSource {
	createAdmin(admin: Admin): Promise<number> {
		const sql =
			"INSERT INTO admins (user_id, role_id, full_name) VALUES(?, ?, ?)";

		return new Promise((resolve, reject) => {
			user_db.query(
				sql,
				[admin.user_id, admin.role_id, admin.full_name],
				(error, result) => {
					if (error) {
						console.log(error);
					}

					const insertId = (<OkPacket>result).insertId;
					resolve(insertId);
				}
			);
		});
	}
	getAdminByUserId(userId: number): Promise<Admin | null> {
		const sql =
			"SELECT * FROM admins WHERE user_id=? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [userId], (error, result) => {
				if (error) {
					console.log(error);
				}

				const data = <RowDataPacket>result;

				if (data.length > 0) {
					const admin = new AdminModel(
						data[0]["user_id"],
						data[0]["role_id"],
						data[0]["full_name"],
						data[0]["id"]
					);

					resolve(admin);
				} else {
					resolve(null);
				}
			});
		});
	}
}
