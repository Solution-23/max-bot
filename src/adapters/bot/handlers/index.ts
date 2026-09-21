import { Bot } from '../../../entity/bot.entity';
import { StartUseCase } from '../../../use-case/start.use-case';
import { registerBotStartedHandler } from './start';

export function handlerMessageAll(bot: Bot): void {
    bot.on('message_created', async (ctx) => {
        const text = ctx.message?.body?.text;
        if (!text || text.startsWith('/')) {
            return;
        }
        await ctx.reply(`Ты написал: ${text}`);
    });
}

export function handlerCallbackAll(bot: Bot): void {
    // Пока кнопок нет
}

export function registerHandlers(bot: Bot, startUseCase: StartUseCase): void {
    registerBotStartedHandler(bot, startUseCase);
    handlerMessageAll(bot);
    handlerCallbackAll(bot);
}
