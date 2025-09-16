import type { CollectionConfig } from 'payload';

export const Poems: CollectionConfig = {
    slug: 'poems',
    labels: {
        singular: {
            en: 'Poem',
            pl: 'Wiersz'
        },
        plural: {
            en: 'Poems',
            pl: 'Wiersze'
        }
    },
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media'
        },
        {
            name: 'title',
            type: 'text'
        },
        {
            name: 'brief',
            type: 'textarea'
        },
        {
            name: 'content',
            type: 'richText'
        }
    ]
};
