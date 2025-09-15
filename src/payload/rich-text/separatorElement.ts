import { RichTextElement } from '@payloadcms/richtext-slate';
import { v4 as uuid } from 'uuid';

export const separatorElement: () => RichTextElement = () => ({
    name: `group-separator-${uuid()}`,
    Button: { path: '/components/slate-editor/GroupSeparator' },
    Element: { path: '/components/slate-editor/GroupSeparator' }
});
