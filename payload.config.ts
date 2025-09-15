import sharp from 'sharp';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { Poems } from '@/payload/collections/Poems';
import { pl } from '@payloadcms/translations/languages/pl';
import { en } from '@payloadcms/translations/languages/en';
import { Media } from '@/payload/collections/Media';
import { fileURLToPath } from 'url';
import path from 'path';
import { slateEditor } from '@payloadcms/richtext-slate';
import { descriptionElement } from '@/payload/rich-text/descriptionElement';
import { separatorElement } from '@/payload/rich-text/separatorElement';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fallbackLanguage = 'en';

export default buildConfig({
    secret: 'dasd',
    admin: {
        importMap: {
            baseDir: path.resolve(__dirname, 'src')
        },
        livePreview: {
            url: 'http://localhost:3000',
            collections: ['poems'],
            globals: ['poems']
        }
    },
    editor: slateEditor({
        admin: {
            elements: [
                descriptionElement({ fallbackLanguage, en: 'Headers', pl: 'Nagłówki' }),
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                separatorElement(),

                descriptionElement({ fallbackLanguage, en: 'Formatting', pl: 'Formatowanie' }),
                'indent',
                'textAlign',
                'blockquote',
                separatorElement(),

                descriptionElement({ fallbackLanguage, en: 'Lists', pl: 'Listy' }),
                'ol',
                'ul',
                'li',
                separatorElement(),

                descriptionElement({ fallbackLanguage, en: 'Links', pl: 'Łącza' }),
                'link',
                'upload',
                'relationship',
                separatorElement(),

                descriptionElement({ fallbackLanguage, en: 'Text style', pl: 'Styl tekstu' })
            ],
            leaves: ['bold', 'italic', 'underline', 'strikethrough']
        }
    }),
    collections: [Poems, Media],
    db: sqliteAdapter({
        client: {
            url: 'file:./database.db'
        }
    }),
    i18n: {
        supportedLanguages: { pl, en },
        fallbackLanguage,
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
        outputFile: path.resolve(__dirname, 'src', 'payload', 'generated-types.ts')
    },
    sharp
});
