import { DefaultTranslationsObject } from '@payloadcms/translations';
import { pl } from '@payloadcms/translations/languages/pl';
import { en } from '@payloadcms/translations/languages/en';

export { translations } from './translations';

export type Translation = Partial<object | DefaultTranslationsObject>;

export const supportedLanguages = { pl, en } as const;

export const fallbackLanguage = 'en' as const;
