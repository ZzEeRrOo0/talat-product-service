export interface ResetPasswordUseCase {
	execute(userId: number, password: string): Promise<boolean>;
}
