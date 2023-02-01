import { UserRequest } from "../../../../domain/entities/user-request";

export class UserRequestModel implements UserRequest {
	fb_uid: string;
	full_name: string;
	date_of_birth: string;
	gender: string;
	phone: number;
	user_type_id: number;
	village: string;
	district_id: number;
	province_id: number;

	constructor(
		$fb_uid: string,
		$full_name: string,
		$date_of_birth: string,
		$gender: string,
		$phone: number,
		$user_type_id: number,
		$village: string,
		$district_id: number,
		$province_id: number
	) {
		this.fb_uid = $fb_uid;
		this.full_name = $full_name;
		this.date_of_birth = $date_of_birth;
		this.gender = $gender;
		this.phone = $phone;
		this.user_type_id = $user_type_id;
		this.village = $village;
		this.district_id = $district_id;
		this.province_id = $province_id;
	}
}
