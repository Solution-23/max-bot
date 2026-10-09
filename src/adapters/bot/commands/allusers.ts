import { Bot } from '../../../entity/bot.entity';
import { BotDeps } from '../deps';
import { isAdmin } from './admin-check';

export function registerAllUsersCommand(bot: Bot, deps: BotDeps): void {
  bot.command('allusers', async (ctx) => {
    if (!isAdmin(deps.checkAdminUseCase, ctx.message?.sender?.user_id)) return;

    const users = deps.getAllUsersUseCase.execute();
    if (users.length === 0) {
      await ctx.reply('Пользователей пока нет.');
      return;
    }

    const lines = users.map(
      (u, i) => `${i + 1}. ${u.id} ${u.username ? '@' + u.username : '—'}`,
    );
    await ctx.reply(`Всего пользователей: ${users.length}`);
    for (const chunk of deps.utils.splitLines(lines)) {
      await ctx.reply(chunk);
    }
  });
}
