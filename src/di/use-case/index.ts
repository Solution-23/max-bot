import { StartUseCase } from '../../use-case/start.use-case';
import { SetAdminUseCase } from '../../use-case/set-admin.use-case';
import { CheckAdminUseCase } from '../../use-case/check-admin.use-case';
import { GetAllUsersUseCase } from '../../use-case/get-all-users.use-case';
import { repositories } from '../repositories';

const start = new StartUseCase(repositories.user);
const setAdmin = new SetAdminUseCase(repositories.user);
const checkAdmin = new CheckAdminUseCase(repositories.user);
const getAllUsers = new GetAllUsersUseCase(repositories.user);

export const useCases = { start, setAdmin, checkAdmin, getAllUsers } as const;
