import { GREETING } from '../messages';
import { Bot } from '../../../entity/bot.entity';
import { StartUseCase } from '../../../use-case/start.use-case';

export function registerBotStartedHandler(bot: Bot, startUseCase: StartUseCase): void {
    bot.on('bot_started', async (ctx) => {
        const user = ctx.user;
        if (user) {
            startUseCase.execute({ id: user.user_id, username: user.username });
        }

        await GREETING
    });
}
