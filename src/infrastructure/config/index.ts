import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, { message: 'BOT_TOKEN не может быть пустым' }),
  DB_PATH: z.string().default('./data/bot.db'),
  ADMIN_ID: z.preprocess(
    (val) => Number(val),
    z.number().int().positive().optional()
  ),
  NOTIFY_DELAY_MS: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative().default(100)
  ),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Ошибка валидации переменных окружения:');
  env.error.errors.forEach((error) => {
    console.error(`- ${error.path.join('.')}: ${error.message}`);
  });
  process.exit(1);
}

export const config = env.data;
export type Config = z.infer<typeof envSchema>;
