export interface GetUserByPhoneNumberUseCase {
	execute(phone: string): Promise<boolean>;
}
