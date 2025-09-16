import { slateEditor } from '@payloadcms/richtext-slate';
import { descriptionElement, separatorElement } from './elements';
import { fallbackLanguage } from '../i18n';

export const editor = slateEditor({
    admin: {
        elements: [
            descriptionElement({ fallbackLanguage, en: 'Header', pl: 'Nagłówek' }),
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
            separatorElement(),

            descriptionElement({ fallbackLanguage, en: 'List', pl: 'Lista' }),
            'ol',
            'ul',
            'li',
            separatorElement(),

            descriptionElement({ fallbackLanguage, en: 'Link', pl: 'Łącze' }),
            'link',
            'upload',
            separatorElement(),

            descriptionElement({ fallbackLanguage, en: 'Text style', pl: 'Styl tekstu' }),
            'blockquote'
        ],
        leaves: ['bold', 'italic', 'underline', 'strikethrough']
    }
});
