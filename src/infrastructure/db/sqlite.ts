import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

export function createDatabase(dbPath: string): Database.Database {
    // Создаем папку под файл БД, если её нет
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Создаем или открываем БД
    const db = new Database(dbPath);

    // Включаем WAL и foreign_keys
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    // Создаем таблицу users, если её нет
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            options TEXT NOT NULL DEFAULT '{}',
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        )
    `);

    return db;
}
