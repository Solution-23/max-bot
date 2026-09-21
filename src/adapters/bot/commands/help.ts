import { Bot } from '../../../entity/bot.entity';
import { BotDeps } from '../deps';
import { isAdmin } from './admin-check';

const BASE_HELP = 'Доступные команды:\n\n/start — запустить бота\n/help — список команд';
const ADMIN_HELP =
  '\n\nКоманды администратора:\n/allusers — список пользователей\n/ids — выгрузка ID в файл\n/notify Текст — рассылка всем пользователям';

export function registerHelpCommand(bot: Bot, deps: BotDeps): void {
  bot.hears(/^\/help\b/, async (ctx) => {
    const admin = isAdmin(deps.checkAdminUseCase, ctx.message?.sender?.user_id);
    await ctx.reply(admin ? BASE_HELP + ADMIN_HELP : BASE_HELP);
  });
}