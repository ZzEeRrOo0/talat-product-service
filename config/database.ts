import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
});

export const user_db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.USER_DB_NAME,
});

export const transection_db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.TRANSECTION_DB_NAME,
});

export const payment_db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.PAYMENT_DB_NAME,
});
