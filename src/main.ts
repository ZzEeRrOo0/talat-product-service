import server from "./server";
import ContactRouter from "./presentation/routers/contact-router";
import { GetAllContacts } from "./domain/use-cases/contact/get-all-contacts";
import { ContactRepositoryImpl } from "./domain/repositories/contact-repository";
import { CreateContact } from "./domain/use-cases/contact/create-contact";
import { MongoClient } from "mongodb";
import { DatabaseWrapper } from "./data/interfaces/data-sources/database-wrapper";
import { MongoDBContactDataSource } from "./data/data-sources/mongodb/mongodb-contact-data-source";
import * as dotenv from "dotenv";

dotenv.config();

(async () => {
	const client: MongoClient = new MongoClient(
		"mongodb://localhost:27017/contacts"
	);
	await client.connect();
	const db = client.db("CONTACTS_DB");

	const contactDatabase: DatabaseWrapper = {
		find: (query) => db.collection("contacts").find(query).toArray(),
		insertOne: (doc) => db.collection("contacts").insertOne(doc),
	};

	const contactMiddleWare = ContactRouter(
		new GetAllContacts(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDatabase)
			)
		),
		new CreateContact(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDatabase)
			)
		)
	);

	server.use("/contact", contactMiddleWare);
	server.listen(process.env.PORT, () => console.log("Running on server"));
})();
