import { UserRequest } from "../../../entities/user-request";

export interface AddUserUseCase {
	execute(user: UserRequest): Promise<number>;
}
