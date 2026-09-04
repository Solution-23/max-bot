import 'dotenv/config';
import { Bot } from '@maxhub/max-bot-api';

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('Не задан BOT_TOKEN — добавь его в файл .env');
}

const bot = new Bot(token);

// Подсказка с командой в интерфейсе MAX (необязательно, но удобно)
bot.api.setMyCommands([
  { name: 'start', description: 'Начать работу с ботом' },
]);

// Ответ на команду /start
bot.command('start', (ctx) => ctx.reply('Привет'));

// На случай если пользователь просто открыл диалог с ботом
bot.on('bot_started', (ctx) => ctx.reply('Привет'));

bot.start();

console.log('Бот запущен и ожидает сообщений...');
