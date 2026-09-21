import { Bot } from '../../../entity/bot.entity';

export function registerHelpCommand(bot: Bot): void {
    bot.hears(/^\/help\b/, async (ctx) => {
        await ctx.reply('Доступные команды:\n\n/start — запустить бота\n/help — список команд');
    });
}
