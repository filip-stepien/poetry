import { sqliteAdapter } from '@payloadcms/db-sqlite';

export const db = sqliteAdapter({
    client: {
        url: 'file:./database.db'
    }
});
