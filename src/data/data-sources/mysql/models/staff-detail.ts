import { StaffDetail } from "../../../../domain/entities/staff-detail";

export class StaffDetailModel implements StaffDetail {
	staff_id: number;
	full_name: string;
	date_of_birth: Date;
	gender: string;
	province_id: number;
	district: string;
	village: string;

	constructor(
		$staff_id: number,
		$full_name: string,
		$date_of_birth: Date,
		$gender: string,
		$province_id: number,
		$district: string,
		$village: string
	) {
		this.staff_id = $staff_id;
		this.full_name = $full_name;
		this.date_of_birth = $date_of_birth;
		this.gender = $gender;
		this.province_id = $province_id;
		this.district = $district;
		this.village = $village;
	}
}
