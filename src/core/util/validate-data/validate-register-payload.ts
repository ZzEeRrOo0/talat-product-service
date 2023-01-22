import { RegisterPayload } from "../../../domain/entities/register-payload"

export const checkRegisterData = (register_data: RegisterPayload) => {

    if (register_data == null) { return false }

    if (register_data.fb_uid == null) {
        console.log('fb_uid')
        return false
    }

    if (register_data.firstname == null) {
        console.log('firstname')
        return false
    }

    if (register_data.lastname == null) {
        console.log('lastname')
        return false
    }

    if (register_data.date_of_birth == null) {
        console.log('date_of_birth')
        return false
    }

    if (register_data.gender == null) {
        console.log('gender')
        return false
    }

    if (register_data.phone == null) {
        console.log('phone')
        return false
    }

    if (register_data.user_type_id == null) {
        console.log('user_type_id')
        return false;
    }
    if (register_data.village_id == null) {
        console.log('village_id')
        return false;
    }
    if (register_data.district_id == null) {
        console.log('district_id')
        return false;
    }
    if (register_data.province_id == null) {
        console.log('province_id')
        return false;
    }
    if (register_data.customer_type_id == null) {
        console.log('customer_type_id')
        return false;
    }
    if (register_data.customer_receipt_and_tax_invoice_id == null) {
        console.log('customer_receipt_and_tax_invoice_id')
        return false;
    }
    if (register_data.full_name == null) {
        console.log('full_name')
        return false;
    }
    if (register_data.id_card_number == null) {
        console.log('id_card_number')
        return false;
    }
    if (register_data.address == null) {
        console.log('address')
        return false;
    }
    if (register_data.company_name == null) {
        console.log('company_name')
        return false;
    }
    if (register_data.juristic_person_registration_number == null) {
        console.log('juristic_person_registration_number')
        return false;
    }
    if (register_data.registration_address == null) {
        console.log('registration_address')
        return false;
    }
    if (register_data.name == null) {
        console.log('name')
        return false;
    }
    if (register_data.restaurant_type_id == null) {
        console.log('restaurant_type_id')
        return false;
    }
    if (register_data.restaurant_purchase_order_id == null) {
        console.log('restaurant_purchase_order_id')
        return false;
    }
    if (register_data.restaurant_branch_id == null) {
        console.log('restaurant_branch_id')
        return false;
    }
    if (register_data.location == null) {
        console.log('location')
        return false;
    }

    return true
}