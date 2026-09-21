import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { Bot } from '../../../entity/bot.entity';
import { BotDeps } from '../deps';
import { isAdmin } from './admin-check';

export function registerIdsCommand(bot: Bot, deps: BotDeps): void {
  bot.command('ids', async (ctx) => {
    if (!isAdmin(deps.checkAdminUseCase, ctx.message?.sender?.user_id)) return;

    const users = deps.getAllUsersUseCase.execute();
    if (users.length === 0) {
      await ctx.reply('Пользователей пока нет.');
      return;
    }

    // Временный файл: имя в MAX берётся из пути
    const dir = mkdtempSync(join(tmpdir(), 'bot-ids-'));
    const filePath = join(dir, 'ids.txt');
    try {
      writeFileSync(filePath, users.map((u) => u.id).join('\n'), 'utf8');
      const file = await bot.api.uploadFile({ source: filePath });
      await ctx.reply(`ID пользователей: ${users.length}`, { attachments: [file.toJson()] });
    } finally {
      rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
    }
  });
}