export const GREETING =
  'Привет! Я простой MAX-бот.\n\nДоступные команды:\n/start — запустить бота\n/help — список команд';

export function welcomeMessage(name: string): string {
    return `Добро пожаловать, ${name}!`;
}

export function welcomeBackMessage(name: string): string {
    return `С возвращением, ${name}!`;
}
