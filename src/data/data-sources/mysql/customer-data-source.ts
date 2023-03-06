import { CustomerDataSource } from "../../interfaces/data-sources/mysql/customer-data-source";
import { IndividualCustomerModel } from "./models/individual-customer";
import { JuristicPersonCustomerModel } from "./models/juristic-person-customer";
import { user_db } from "../../../../config/database";
import { RowDataPacket } from "mysql2";
import { CustomerModel } from "./models/customer";

export class CustomerDataSourceImpl implements CustomerDataSource {
	getCustomerByUserId(userId: number): Promise<CustomerModel | null> {
		const sql =
			"SELECT id, user_id, customer_type_id " +
			"FROM customers " +
			"WHERE user_id = ? AND deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [userId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}
				const data = <RowDataPacket>result;

				if (data.length > 0) {
					const customer = new CustomerModel(
						data[0]["user_id"],
						data[0]["customer_type_id"],
						data[0]["id"]
					);

					resolve(customer);
				} else {
					resolve(null);
				}
			});
		});
	}

	getCustomerIndividualByCustomerId(
		customerId: number
	): Promise<IndividualCustomerModel | null> {
		const sql =
			"SELECT ci.id, ci.customer_id, ci.full_name, ci.id_card_number, ci.address " +
			"FROM customers AS c " +
			"LEFT JOIN customer_individual AS ci ON ci.customer_id = c.id " +
			"WHERE c.id = ? AND c.deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [customerId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}
				const data = <RowDataPacket>result;

				if (data.length > 0) {
					const individualCustomer = new IndividualCustomerModel(
						data[0]["customer_id"],
						data[0]["full_name"],
						data[0]["id_card_number"],
						data[0]["address"],
						data[0]["id"]
					);

					resolve(individualCustomer);
				} else {
					resolve(null);
				}
			});
		});
	}

	getCustomerJuristicPersonByCustomerId(
		customerId: number
	): Promise<JuristicPersonCustomerModel | null> {
		const sql =
			"SELECT cj.id, ci.customer_id, cj.company_name, cj.juristic_person_registration_number, cj.registration_address " +
			"FROM customers AS c " +
			"LEFT JOIN customer_juristic_person AS cj ON cj.customer_id = c.id " +
			"WHERE c.id = ? AND c.deleted_at IS NULL";

		return new Promise((resolve, reject) => {
			user_db.query(sql, [customerId], (error, result) => {
				if (error) {
					// throw new Error("Internal server error.");
					console.log(error);
				}
				const data = <RowDataPacket>result;

				if (data.length > 0) {
					const juristicPersonCustomer =
						new JuristicPersonCustomerModel(
							data[0]["customer_id"],
							data[0]["company_name"],
							data[0]["juristic_person_registration_number"],
							data[0]["registration_address"],
							data[0]["id"]
						);

					resolve(juristicPersonCustomer);
				} else {
					resolve(null);
				}
			});
		});
	}
}
