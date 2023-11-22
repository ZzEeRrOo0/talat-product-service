export interface GetUserByPhoneNumberFromUserDBUseCase {
	execute(phone: string): Promise<boolean>;
}
