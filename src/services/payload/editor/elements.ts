import { RichTextElement } from '@payloadcms/richtext-slate';
import { AcceptedLanguages } from '@payloadcms/translations';
import { v4 as uuid } from 'uuid';

type DescriptionOptions<T extends string> = T extends AcceptedLanguages
    ? { fallbackLanguage: T } & Record<T, string> &
          Partial<Record<Exclude<AcceptedLanguages, T>, string>>
    : { fallbackLanguage?: undefined } & Partial<Record<AcceptedLanguages, string>>;

/**
if fallbackLanguage is provided, its description property is required, for example:
```
{
    fallbackLanguage: 'en',
    en: 'some description' // required
}
```
*/
export const descriptionElement: <T extends string>(
    descriptionOptions: DescriptionOptions<T>
) => RichTextElement = descriptionOptions => ({
    name: `group-description-${uuid()}`,
    Button: {
        path: '/components/slate-editor/GroupDescription',
        serverProps: { ...descriptionOptions }
    },
    Element: { path: '/components/slate-editor/GroupDescription' }
});

export const separatorElement: () => RichTextElement = () => ({
    name: `group-separator-${uuid()}`,
    Button: { path: '/components/slate-editor/GroupSeparator' },
    Element: { path: '/components/slate-editor/GroupSeparator' }
});
