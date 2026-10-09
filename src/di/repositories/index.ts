import { createDatabase } from '../../infrastructure/db/sqlite';
import { UserRepository } from '../../repositories/user.repository';
import { config } from '../../infrastructure/config';

const db = createDatabase(config.DB_PATH);
const userRepository = new UserRepository(db);

export const repositories = { user: userRepository } as const;
export { db };
