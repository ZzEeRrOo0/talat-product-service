export class APIResponse {
	status: number;
	data: Object;

	constructor($status: number, $data: Object) {
		this.status = $status;
		this.data = $data;
	}
}
