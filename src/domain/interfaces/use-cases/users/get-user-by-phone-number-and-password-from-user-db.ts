export interface GetUserByPhoneNumberAndPasswordFromUserDBUseCase {
	execute(phone: string, password: string): Promise<boolean>;
}
