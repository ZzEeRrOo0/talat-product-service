import { twilioClient } from "../../../../config/twilio";

export interface SMSService {
	sendMessage(message: string, phone: string): Promise<void>;
}

export class SMSServiceImpl implements SMSService {
	async sendMessage(message: string, phone: string): Promise<void> {
		await twilioClient.messages.create({
			body: message,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phone,
		});
	}
}
