import { Bot } from '../../../entity/bot.entity';
import { BotDeps } from '../deps';
import { isAdmin } from './admin-check';

const MAX_CHUNK = 3000; // с запасом под лимит длины сообщения

function splitLines(lines: string[]): string[] {
  const chunks: string[] = [];
  let current = '';
  for (const line of lines) {
    if (current && current.length + line.length + 1 > MAX_CHUNK) {
      chunks.push(current);
      current = '';
    }
    current += (current ? '\n' : '') + line;
  }
  if (current) chunks.push(current);
  return chunks;
}

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
    for (const chunk of splitLines(lines)) {
      await ctx.reply(chunk);
    }
  });
}