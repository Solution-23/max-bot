import { CheckAdminUseCase } from '../../use-case/check-admin.use-case';
import { GetAllUsersUseCase } from '../../use-case/get-all-users.use-case';
import { StartUseCase } from '../../use-case/start.use-case';

export type BotDeps = {
  startUseCase: StartUseCase;
  checkAdminUseCase: CheckAdminUseCase;
  getAllUsersUseCase: GetAllUsersUseCase;
  notifyDelayMs: number;
};