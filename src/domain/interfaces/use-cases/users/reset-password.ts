export interface ResetPasswordUseCase {
	execute(phone: string, password: string): Promise<boolean>;
}
