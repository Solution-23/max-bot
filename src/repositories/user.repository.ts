import Database from 'better-sqlite3';
import { z } from 'zod';
import { User, UserOptions } from '../entity/user.entity';

const userOptionsSchema = z.object({
    role: z.union([z.literal('admin'), z.literal('user')]).optional(),
});

export class UserRepository {
    private db: Database.Database;
    private findByIdStmt: Database.Statement;
    private createStmt: Database.Statement;
    private updateStmt: Database.Statement;
    private findAllStmt: Database.Statement;

    constructor(db: Database.Database) {
        this.db = db;
        this.findByIdStmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
        this.createStmt = this.db.prepare('INSERT INTO users (id, username, options, created_at, updated_at) VALUES (?, ?, ?, ?, ?)');
        this.updateStmt = this.db.prepare('UPDATE users SET username = ?, options = ?, updated_at = ? WHERE id = ?');
        this.findAllStmt = this.db.prepare('SELECT * FROM users');
    }

    private mapToUser(row: any): User {
        return {
            id: row.id,
            username: row.username,
            options: this.parseOptions(row.options),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
    }

    private parseOptions(options: string): UserOptions {
        try {
            const parsed = JSON.parse(options);
            return userOptionsSchema.parse(parsed);
        } catch (error) {
            return {};
        }
    }

    findById(id: number): User | undefined {
        const row = this.findByIdStmt.get(id);
        return row ? this.mapToUser(row) : undefined;
    }

    create({ id, username }: { id: number; username: string | null }): User {
        const now = Date.now();
        const options = '{}';
        this.createStmt.run(id, username, options, now, now);
        return {
            id,
            username,
            options: {},
            createdAt: now,
            updatedAt: now,
        };
    }

    update(id: number, { username, options }: { username?: string | null; options?: UserOptions }): User {
        const now = Date.now();
        const user = this.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const updatedOptions = options ? JSON.stringify(options) : JSON.stringify(user.options);
        this.updateStmt.run(username ?? user.username, updatedOptions, now, id);
        return {
            ...user,
            username: username ?? user.username,
            options: options ?? user.options,
            updatedAt: now,
        };
    }

    findAll(): User[] {
        const rows = this.findAllStmt.all();
        return rows.map(row => this.mapToUser(row));
    }
}
