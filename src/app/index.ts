import { config } from '../infrastructure/config';
import { createDatabase } from '../infrastructure/db/sqlite';
import { UserRepository } from '../repositories/user.repository';
import { StartUseCase } from '../use-case/start.use-case';
import { SetAdminUseCase } from '../use-case/set-admin.use-case';
import { InitBot } from '../adapters/bot';

async function main() {
    // Сборка зависимостей (позже переедет в di/)
    const db = createDatabase(config.DB_PATH);
    const userRepository = new UserRepository(db);
    const startUseCase = new StartUseCase(userRepository);
    const setAdminUseCase = new SetAdminUseCase(userRepository);

    if (config.ADMIN_ID) {
        setAdminUseCase.execute(config.ADMIN_ID);
        console.log(`Админ назначен: ${config.ADMIN_ID}`);
    }

    const bot = InitBot(config.BOT_TOKEN, startUseCase);

    console.log('Запускаю бота...');

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            await bot.start();
            break;
        } catch (err) {
            console.error(`Попытка ${attempt} не удалась:`, err);
            if (attempt < 3) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                db.close();
                process.exit(1);
            }
        }
    }

    process.on('SIGINT', () => {
        bot.stopPolling();
        db.close();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        bot.stopPolling();
        db.close();
        process.exit(0);
    });
}

main().catch((err) => {
    console.error('Ошибка при запуске бота:', err);
    process.exit(1);
});
