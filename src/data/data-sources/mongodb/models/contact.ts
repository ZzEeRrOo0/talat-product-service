import { Contact } from "../../../../domain/entities/contact";

export class ContactModel implements Contact {
	id?: string | undefined;
	email!: string;
	firstName!: string;
	surname!: string;
}
