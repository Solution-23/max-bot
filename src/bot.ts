import 'dotenv/config';
import { Bot } from '@maxhub/max-bot-api';

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('BOT_TOKEN is not set');
}

const bot = new Bot(token);

// /start
bot.command('start', async (ctx) => {
  await ctx.reply(
    'Привет! Я простой MAX-бот.\n\n' +
    'Доступные команды:\n' +
    '/start — запустить бота\n' +
    '/help — список команд\n' +
    '/about — информация о боте'
  );
});

// /help
bot.command('help', async (ctx) => {
  await ctx.reply(
    'Доступные команды:\n\n' +
    '/start — запустить бота\n' +
    '/help — список команд\n' +
    '/about — информация о боте'
  );
});

// /about
bot.command('about', async (ctx) => {
  await ctx.reply(
    'Я учебный бот для MAX Messenger.\n' +
    'Написан на TypeScript с использованием @maxhub/max-bot-api.'
  );
});

// Ответ на обычные сообщения
bot.on('message_created', async (ctx) => {
  const text = ctx.message?.body?.text;

  if (!text || text.startsWith('/')) {
    return;
  }

  await ctx.reply(`Ты написал: ${text}`);
});

bot.start();
