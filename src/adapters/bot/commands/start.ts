import { GREETING, welcomeMessage, welcomeBackMessage } from '../messages';
import { Bot } from '../../../entity/bot.entity';
import { StartUseCase } from '../../../use-case/start.use-case';

export function registerStartCommand(bot: Bot, startUseCase: StartUseCase): void {
    bot.command('start', async (ctx) => {
        const sender = ctx.message?.sender;
        if (!sender) {
            await ctx.reply(GREETING);
            return;
        }

        const { user, isNew } = startUseCase.execute({ id: sender.user_id, username: sender.username ?? null });
        if (isNew) {
            await ctx.reply(welcomeMessage(sender.first_name));
        } else {
            await ctx.reply(welcomeBackMessage(sender.first_name));
        }
    });
}
