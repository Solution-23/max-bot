import { Bot } from '../../../entity/bot.entity';
import { StartUseCase } from '../../../use-case/start.use-case';
import { registerStartCommand } from './start';
import { registerHelpCommand } from './help';

export function registerCommands(bot: Bot, startUseCase: StartUseCase): void {
    registerStartCommand(bot, startUseCase);
    registerHelpCommand(bot);

    // Админские команды (allusers, notify, ids) будут подключены здесь позже
}
