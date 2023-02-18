import { UserRequest } from "../../../../domain/entities/user-request";

export class UserRequestModel implements UserRequest {
	fb_uid: string;
	password: string;
	phone: number;
	user_type_id: number;

	constructor(
		$fb_uid: string,
		$password: string,
		$phone: number,
		$user_type_id: number
	) {
		this.fb_uid = $fb_uid;
		this.password = $password;
		this.phone = $phone;
		this.user_type_id = $user_type_id;
	}
}
