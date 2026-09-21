import { GREETING } from '../messages';
import { Bot } from '../../../entity/bot.entity';
import { StartUseCase } from '../../../use-case/start.use-case';

export function registerStartCommand(bot: Bot, startUseCase: StartUseCase): void {
    bot.command('start', async (ctx) => {
        const sender = ctx.message?.sender;
        if (sender) {
            startUseCase.execute({ id: sender.user_id, username: sender.username ?? null });
        }

        await GREETING
    });
}
