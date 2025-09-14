import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { Poems } from '@/payload/collections/Poems';
import { pl } from '@payloadcms/translations/languages/pl';
import { en } from '@payloadcms/translations/languages/en';
import { Media } from '@/payload/collections/Media';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
    editor: lexicalEditor({
        admin: { hideInsertParagraphAtEnd: true, hideGutter: true }
    }),
    collections: [Poems, Media],
    secret: 'dasd',
    admin: {
        livePreview: {
            url: 'http://localhost:3000',
            collections: ['poems'],
            globals: ['poems']
        }
    },
    db: sqliteAdapter({
        client: {
            url: 'file:./database.db'
        }
    }),
    i18n: {
        supportedLanguages: { pl, en },
        fallbackLanguage: 'en',
        translations: {
            pl: {
                general: {
                    noResults: 'Brak wyników.',
                    users: 'Użytkownicy'
                }
            }
        }
    },
    typescript: {
        outputFile: path.resolve(__dirname, 'src', 'payload', 'types.ts')
    },
    sharp
});
