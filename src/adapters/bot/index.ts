import { Bot } from '../../entity/bot.entity';
import { registerCommands } from './commands';
import { BotDeps } from './deps';
import { registerHandlers } from './handlers';

export function InitBot(token: string, deps: BotDeps): Bot {
  const bot = new Bot(token);

  // Команды регистрируем раньше общих обработчиков
  registerCommands(bot, deps);
  registerHandlers(bot, deps.startUseCase);

  bot.catch((err) => {
    console.error('Ошибка при обработке обновления:', err);
  });

  return bot;
}