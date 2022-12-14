import { MongoClient } from "mongodb";
import { MongoDBContactDataSource } from "../../../data/data-sources/mongodb/mongodb-contact-data-source";
import { ProductDataSourceImpl } from "../../../data/data-sources/mysql/product-data-source";
import { DatabaseWrapper } from "../../../data/interfaces/data-sources/mongodb/database-wrapper";
import { ContactRepositoryImpl } from "../../../domain/repositories/contact-repository";
import { ProductRepositoryImpl } from "../../../domain/repositories/product-repository";
import { CreateContact } from "../../../domain/use-cases/contact/create-contact";
import { GetAllContacts } from "../../../domain/use-cases/contact/get-all-contacts";
import { GetAllProduct } from "../../../domain/use-cases/product/get-all-product";
import ProductRouter from "../product-router";
import ContactsRouter from "../contact-router";

export const contactMiddleWare = async () => {
	const client: MongoClient = new MongoClient(
		"mongodb://localhost:27017/contacts"
	);
	await client.connect();
	const db = client.db("CONTACTS_DB");

	const contactDatabase: DatabaseWrapper = {
		find: (query) => db.collection("contacts").find(query).toArray(),
		insertOne: (doc) => db.collection("contacts").insertOne(doc),
	};

	return ContactsRouter(
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
};

export const ProductMiddleWare = ProductRouter(
	new GetAllProduct(new ProductRepositoryImpl(new ProductDataSourceImpl()))
);