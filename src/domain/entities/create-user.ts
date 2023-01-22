export class CreateUser {
    fb_uid: string;
    firstname: string;
    lastname: string;
    date_of_birth: string;
    gender: string;
    phone: number;
    user_type_id: number;
    village_id: number;
    district_id: number;
    province_id: number;



    constructor(
        fb_uid: string,
        firstname: string,
        lastname: string,
        date_of_birth: string,
        gender: string,
        phone: number,
        user_type_id: number,
        village_id: number,
        district_id: number,
        province_id: number,
    ) {
        this.fb_uid = fb_uid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.date_of_birth = date_of_birth;
        this.gender = gender;
        this.phone = phone;
        this.user_type_id = user_type_id;
        this.village_id = village_id;
        this.district_id = district_id;
        this.province_id = province_id;
    }

} 