import { User } from "../../../../domain/entities/user";

export class UserModel implements User {
    id: number;
    user_type_id!: number;
    full_name!: string;
    gender!: string;
    user_type_name!: string;
    phone!: string;

    constructor(
        id: number,
        user_type_id: number,
        full_name: string,
        gender: string,
        user_type_name: string,
        phone: string,
    ) {
        (this.id = id),
            (this.user_type_id = user_type_id),
            (this.full_name = full_name),
            (this.gender = gender),
            (this.user_type_name = user_type_name),
            (this.phone = phone);
    }
}
