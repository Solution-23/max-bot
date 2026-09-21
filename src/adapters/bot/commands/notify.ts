import { Bot } from '../../../entity/bot.entity';
import { User } from '../../../entity/user.entity';
import { BotDeps } from '../deps';
import { isAdmin } from './admin-check';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function broadcast(bot: Bot, users: User[], text: string, delayMs: number) {
  let sent = 0;
  let failed = 0;
  for (const user of users) {
    try {
      await bot.api.sendMessageToUser(user.id, text);
      sent++;
    } catch (err) {
      failed++;
      console.error(`Не удалось отправить пользователю ${user.id}:`, err);
    }
    if (delayMs > 0) await sleep(delayMs);
  }
  return { sent, failed };
}

export function registerNotifyCommand(bot: Bot, deps: BotDeps): void {
  let running = false;

    bot.hears(/^\/notify(?:@\S+)?(?:\s+([\s\S]*))?$/, async (ctx) => {
    if (!isAdmin(deps.checkAdminUseCase, ctx.message?.sender?.user_id)) return;

    const text = (ctx.match?.[1] ?? '').trim();    if (!text) {
      await ctx.reply('Использование: /notify Текст рассылки');
      return;
    }
    if (running) {
      await ctx.reply('Рассылка уже идёт, дождитесь её завершения.');
      return;
    }

    const users = deps.getAllUsersUseCase.execute();
    running = true;
    await ctx.reply(`Запускаю рассылку на ${users.length} пользователей...`);

    // Рассылка идёт в фоне, обработчик команды при этом не ждёт её конца
    broadcast(bot, users, text, deps.notifyDelayMs)
      .then(({ sent, failed }) =>
        ctx.reply(`Рассылка завершена. Доставлено: ${sent}, ошибок: ${failed}.`),
      )
      .catch((err) => console.error('Ошибка рассылки:', err))
      .finally(() => {
        running = false;
      });
  });
}