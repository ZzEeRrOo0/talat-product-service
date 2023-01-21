export interface RegisterPayload {

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

    customer_type_id: number;
    customer_receipt_and_tax_invoice_id: number;

    full_name: string;
    id_card_number: number;
    address: string;

    company_name: string;
    juristic_person_registration_number: number;
    registration_address: string;

    name: string;
    restaurant_type_id: number;
    restaurant_purchase_order_id: number;
    restaurant_branch_id: number;
    location: string;

}