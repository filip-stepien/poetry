import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { Poems } from '@/payload/collections/Poems';
import { pl } from '@payloadcms/translations/languages/pl';
import { en } from '@payloadcms/translations/languages/en';
import { Media } from '@/payload/collections/Media';

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
    sharp
});
