import { config } from '../infrastructure/config';
import { InitBot } from '../adapters/bot';
import { DI } from '../di';

async function main() {
    if (config.ADMIN_ID) {
        DI.useCases.setAdmin.execute(config.ADMIN_ID);
        console.log(`Админ назначен: ${config.ADMIN_ID}`);
    }

    const bot = InitBot(config.BOT_TOKEN, {
        startUseCase: DI.useCases.start,
        checkAdminUseCase: DI.useCases.checkAdmin,
        getAllUsersUseCase: DI.useCases.getAllUsers,
        notifyDelayMs: config.NOTIFY_DELAY_MS,
        utils: DI.utils,
    });

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
                DI.repositories.db.close();
                process.exit(1);
            }
        }
    }

    process.on('SIGINT', () => {
        bot.stopPolling();
        DI.repositories.db.close();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        bot.stopPolling();
        DI.repositories.db.close();
        process.exit(0);
    });
}

main().catch((err) => {
    console.error('Ошибка при запуске бота:', err);
    process.exit(1);
});
