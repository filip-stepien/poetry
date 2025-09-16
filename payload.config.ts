import sharp from 'sharp';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import { env } from '@/lib/server/env';
import { supportedLanguages, translations, fallbackLanguage } from '@/services/payload/i18n';
import { defaultLocale, locales } from '@/services/payload/locales';
import { editor } from '@/services/payload/editor';
import { collections } from '@/services/payload/collections';
import { db } from '@/services/payload/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
    secret: env.PAYLOAD_SECRET,
    typescript: { outputFile: path.resolve(__dirname, 'src', 'payload', 'generated-types.ts') },
    admin: { importMap: { baseDir: path.resolve(__dirname, 'src') } },
    editor,
    collections,
    localization: { locales: [...locales], defaultLocale },
    i18n: { supportedLanguages, fallbackLanguage, translations },
    db,
    sharp
});
