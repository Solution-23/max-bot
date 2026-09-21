import { CheckAdminUseCase } from '../../../use-case/check-admin.use-case';

export function isAdmin(checkAdmin: CheckAdminUseCase, userId: number | undefined): boolean {
    if (userId === undefined) {
        return false;
    }
    return checkAdmin.execute(userId);
}
