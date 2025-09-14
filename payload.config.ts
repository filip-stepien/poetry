import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';

export default buildConfig({
    editor: lexicalEditor(),
    collections: [],
    secret: 'dasd',
    db: sqliteAdapter({
        client: {
            url: 'file:./database.db'
        }
    }),
    sharp
});
