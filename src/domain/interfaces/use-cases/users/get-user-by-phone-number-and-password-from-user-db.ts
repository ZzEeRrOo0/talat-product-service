import { User } from "../../../entities/user";

export interface GetUserByPhoneNumberAndPasswordFromUserDBUseCase {
	execute(phone: string, password: string): Promise<User | null>;
}
