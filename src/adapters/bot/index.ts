import { Bot } from '../../entity/bot.entity';
import { StartUseCase } from '../../use-case/start.use-case';
import { registerCommands } from './commands';
import { registerHandlers } from './handlers';

export function InitBot(token: string, startUseCase: StartUseCase): Bot {
    const bot = new Bot(token);

    registerCommands(bot, startUseCase);
    registerHandlers(bot, startUseCase);

    bot.catch((err) => {
        console.error('Ошибка при обработке обновления:', err);
    });

    return bot;
}
