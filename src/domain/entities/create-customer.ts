export class CreateCustomer {
    user_id: number;
    customer_type_id: number;
    customer_receipt_and_tax_invoice_id: number;

    constructor(
        user_id: number,
        customer_type_id: number,
        customer_receipt_and_tax_invoice_id: number,
    ) {
        this.user_id = user_id;
        this.customer_type_id = customer_type_id;
        this.customer_receipt_and_tax_invoice_id = customer_receipt_and_tax_invoice_id;
    }
} 