import { ContactDataSource } from "../../interfaces/data-sources/mongodb/contact-data-source";
import { DatabaseWrapper } from "../../interfaces/data-sources/mongodb/database-wrapper";
import { ContactModel } from "./models/contact";

export class MongoDBContactDataSource implements ContactDataSource {

    private database: DatabaseWrapper
    constructor(database: DatabaseWrapper) {
        this.database = database
    }
    async create(contact: ContactModel): Promise<boolean> {
        const result = await this.database.insertOne(contact)
        return result !== null
    }

    async getAll(): Promise<ContactModel[]> {
        const result = await this.database.find({})
        return result.map(item => ({
            id: item._id.toString(),
            surname: item.surname,
            firstName: item.firstName,
            email: item.email
        }));
    }

}