export class UserToken {
	id?: number;
	display_name: string;
	access_token: string;
	refresh_token: string;

	constructor(
		$display_name: string,
		$access_token: string,
		$refresh_token: string,
		$id?: number
	) {
		this.display_name = $display_name;
		this.access_token = $access_token;
		this.refresh_token = $refresh_token;
		this.id = $id;
	}
}
